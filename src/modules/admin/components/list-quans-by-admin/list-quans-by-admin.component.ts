import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { AppCommonService } from '@common/services';


@Component({
    selector: 'sb-list-quans-by-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list-quans-by-admin.component.html',
    styleUrls: ['list-quans-by-admin.component.scss'],
})
export class ListQuansByAdminComponent implements OnInit {
    constructor(
        private dashboardService: AdminService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private appCommonService: AppCommonService

    ) { }
    ngOnInit() {
        if (this.appCommonService.tokenSai != false) {
            this.appCommonService.tokenSai = false;
            this.appCommonService.resetHttpOptions();
            this.changeDetectorRef.detectChanges();
        }
        if (this.appCommonService.getToken()) {
            try {
                this.appCommonService.httpOptions.headers.get("token");
            } catch (error) {
                this.appCommonService.resetHttpOptions();
            }
            this.page = 1;
            this.getListquans(this.page);
        }

    }
    url = environment.url;

    quans:any;
    checkquans=false;
    page = 1;
    tongpage = 0;
    mangtrang: any;
    quansnew: any;
    soluongtrentrang = 5;
    taoquansnew(page: number) {
        this.quansnew = [];
        this.tongpage = this.quans.length / this.soluongtrentrang;
        let i = (page - 1) * this.soluongtrentrang;
        let k;
        if (page <= this.tongpage) {
            k = this.soluongtrentrang;
        } else {
            k = this.quans.length % this.soluongtrentrang;
        }
        for (let j = 0; j < k; j++) {
            if (j == this.soluongtrentrang) {
                break;
            }
            this.quansnew.push(this.quans[i + j]);

        }
        this.taomangtrang(page);
    }
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
            this.taoquansnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taoquansnew(this.page);
        }
    }
    chontrang(page: number) {
        this.page = page;
        this.taoquansnew(this.page);
    }
    getListquans(page:number) {
        this.checkquans = false;
        this.dashboardService.getListQuansDaPheDuyetByTokenAdmin(page).subscribe(data => {
            if (data.status) {
                this.quans = data.quans;
                this.taoquansnew(page);
                this.checkquans = true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }
    thaydoitrangthai(quan:any){
        Swal.fire({
            html: '<h1 style="color: #41c04d;">b???n c?? mu???n cho qu??n n??y ng???ng ho???t ?????ng hay kh??ng ?</h1><table style="width: 100%;" border="1"><tr><td>id qu??n </td><td>' + quan.id + '</td></tr><tr><td>t??n qu??n </td><td>' + quan.name + '</td></tr><tr><td>Phone qu??n</td><td>' + quan.phone + '</td></tr><tr><td>?????a ch??? qu??n</td><td>' + quan.address + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `ok`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.UpdateTrangThaiQuanTokenAdmin(quan.id,false).subscribe(data=>{
                    if(data.status){
                        this.page=1;
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })
                    }
                    this.router.navigate(['/admin/quans']);

                })
            }
        });
    }
    deleteQuan(quan: any) {
        Swal.fire({
            html: '<h1 style="color: #41c04d;">B???n c?? mu???n x??a Qu??n n??y kh??ng ?</h1><table style="width: 100%;" border="1"><tr ><td style="text-align: center;" colspan="2"><div><img style="width: 100px; " src="' + this.url + '/' + quan.image + '"></div></td></tr><tr><td>t??n qu??n </td><td>' + quan.name + '</td></tr><tr><td>Phone </td><td>' + quan.phone + '</td></tr><tr><td>Address </td><td>' + quan.address + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `Delete`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.deleteQuanByAdmin(quan.id).subscribe(
                    data => {
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'delete qu??n th??nh c??ng',
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
    hienthivitricuaminh = true;
    timkiem = "";
    user="admin";
    search() {
        this.hienthivitricuaminh = false;
        this.checkquans = false;
        this.page = 1;
        this.authService.searchListQuans(this.timkiem).subscribe(data => {
            if (data.status) {
                this.quans = data.quans;
                this.tongpage = data.tongpage;
                this.taoquansnew(this.page);
                this.checkquans = true;
                this.changeDetectorRef.detectChanges();
            }
        })

        this.timkiem = "";
    }

}
