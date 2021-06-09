import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InnkeeperService } from "../../services/innkeeper.service";
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
import { environment } from './../../../../environments/environment';
import Swal from 'sweetalert2';


@Component({
    selector: 'sb-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './innkeeper.component.html',
    styleUrls: ['innkeeper.component.scss'],
})
export class InnkeeperComponent implements OnInit {
    innkeeper: any;
    checkinnkeeper = false;
    constructor(
        private dashboardService: InnkeeperService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService
    ) { }
    ngOnInit() {
        this.checkTokenInnkeeper();
    }
    checkTokenInnkeeper() {
        this.checkinnkeeper = false;
        this.authService.checkTokenInnkeeper().subscribe(result => {
            if (result.status) {
                this.innkeeper = result.innkeeper;
                this.checkinnkeeper = true;
                this.changeDetectorRef.detectChanges();
                this.getListQuansByTokenInnkeeperChuaPheDuyet();
            } else {
                this.router.navigate(['/auth/login']);
            }
        })
    }
    url = environment.url;

    checklistquanschuapheduyet= false;
    listquanschuapheduyet:any;
    getListQuansByTokenInnkeeperChuaPheDuyet(){
        this.checklistquanschuapheduyet= false;
        this.changeDetectorRef.detectChanges();

        this.dashboardService.getListQuansByTokenInnkeeperChuaPheDuyet().subscribe(data =>{
            console.log(data);
            
            if (data.status) {
                this.listquanschuapheduyet=data.quans;
                this.checklistquanschuapheduyet=true;
                this.changeDetectorRef.detectChanges();
            } 
        })
    }
    deleteQuan(quan:any){
        const a=true
        console.log(quan);
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Bạn có muốn xóa Quán này không ?</h1><table style="width: 100%;" border="1"><tr ><td style="text-align: center;" colspan="2"><div><img style="width: 100px; " src="' + this.url + '/' + quan.image + '"></div></td></tr><tr><td>tên quán </td><td>' + quan.name + '</td></tr><tr><td>Phone </td><td>' + quan.phone + '</td></tr><tr><td>Address </td><td>' + quan.address + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `Delete`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.deleteQuanChuaduyetByInnkeeper(quan.id).subscribe(
                    data=>{
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getListQuansByTokenInnkeeperChuaPheDuyet();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: data.message,
                            })

                        }

                    }
                )
  
            } else {

            }
        });

                
    }

}
