import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService} from "../../services/admin.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';



@Component({
    selector: 'sb-admmin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './admmin.component.html',
    styleUrls: ['admmin.component.scss'],
})
export class AdmminComponent implements OnInit {
    constructor(
        private dashboardService: AdminService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef

    ) { }
    ngOnInit() {
        this.page=1;
        this.getListquans(this.page);

    }
    url = environment.url;
    checkadmin=false;
    admin:any;
    listquanschuapheduyet: any;
    checklistquanschuapheduyet = false;
    page = 1;
    tongpage = 0;
    mangtrang: any;
    taomangtrang(page: number) {
        var mang: Array<boolean> = [];
        for (let i = 0; i < this.tongpage; i++) {
            mang.push(false);

        }
        mang[page - 1] = true;
        this.mangtrang = mang;

    }
    Previous() {
        if (this.page > 1) {
            this.page--;
            this.getListquans(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.getListquans(this.page);
        }
    }
    chontrang(page: number) {
        this.page = page;
        this.getListquans(this.page);
    }

    getListquans(page: number) {
        this.checklistquanschuapheduyet = false;
        this.dashboardService.getListQuansChuaPheDuyetByTokenAdmin(page).subscribe(data => {
            console.log(data);

            if (data.status) {
                this.listquanschuapheduyet = data.quans;
                this.tongpage=data.tongpage;
                this.taomangtrang(this.page);
                this.checklistquanschuapheduyet = true;
                this.changeDetectorRef.detectChanges();

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        })
    }
    thaydoitrangthai(quan: any) {
        Swal.fire({
            html: '<h1 style="color: #41c04d;">bạn có muốn cho quán này ngừng hoạt động hay không ?</h1><table style="width: 100%;" border="1"><tr><td>id quán </td><td>' + quan.id + '</td></tr><tr><td>tên quán </td><td>' + quan.name + '</td></tr><tr><td>Phone quán</td><td>' + quan.phone + '</td></tr><tr><td>địa chỉ quán</td><td>' + quan.address + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `ok`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.UpdateTrangThaiQuanTokenAdmin(quan.id,true).subscribe(data => {
                    console.log(data);
                    if (data.status) {
                        this.getListquans(this.page);

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })
                    }
                })
            }
        });

    }
    editAdmin(){
        this.router.navigate(['/dashboard/editadmin'])
    }
    deleteQuan(quan: any) {
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Bạn có muốn xóa Quán này không ?</h1><table style="width: 100%;" border="1"><tr ><td style="text-align: center;" colspan="2"><div><img style="width: 100px; " src="' + this.url + '/' + quan.image + '"></div></td></tr><tr><td>tên quán </td><td>' + quan.name + '</td></tr><tr><td>Phone </td><td>' + quan.phone + '</td></tr><tr><td>Address </td><td>' + quan.address + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `Delete`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.deleteQuanByAdmin(quan.id).subscribe(
                    data => {
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'delete quán thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getListquans(this.page);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: data.message,
                            })

                        }

                    }
                )

            } 
        });


    }

}
