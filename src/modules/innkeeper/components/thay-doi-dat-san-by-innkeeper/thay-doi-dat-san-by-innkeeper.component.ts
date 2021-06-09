import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InnkeeperService } from "../../services/innkeeper.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Thaydoidatsan } from '../../models/innkeeper.model'
import { AuthService } from '../../../auth/services/auth.service';


@Component({
    selector: 'sb-thay-doi-dat-san-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './thay-doi-dat-san-by-innkeeper.component.html',
    styleUrls: ['thay-doi-dat-san-by-innkeeper.component.scss'],
})
export class ThayDoiDatSanByInnkeeperComponent implements OnInit {
    todayOld = new Date().toISOString().slice(0, 10);
    todayNew = new Date().toISOString().slice(0, 10);

    listdatsancuaquanOld: any;
    listdatsancuaquanNew: any;
    checkdatsansOld=false;
    checkdatsansNew=false;
    mangDatsanOld = new Array();
    mangDatsanNew = new Array();
    idsanOld = 0;
    idsanNew = 0;
    timeOld="";
    timeNew="";
    tensanOld="";
    tensanNew="";
    constructor(
        private dashboardService: InnkeeperService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
   ngOnInit() {
       this.checktoken();
   }
    checktoken() {
        this.authService.checkTokenInnkeeper().subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            } else {
                this.getListDatSanByInnkeeperOld(this.todayOld);
                this.getListDatSanByInnkeeperNew(this.todayNew);
            }
        })
    }
    chonngayOld(ngay: any) {
        this.getListDatSanByInnkeeperOld(this.todayOld);
    }
    chonngayNew(ngay: any) {
        this.getListDatSanByInnkeeperNew(this.todayNew);
    }

    getListDatSanByInnkeeperOld(start_time: string){
        this.checkdatsansOld=false;
        this.dashboardService.getListDatSanByInnkeeper(start_time).subscribe(data=>{
            if(data.status){
                this.listdatsancuaquanOld=data.datsans;
                const arrMangOld = new Array();
                for (let i = 0; i < data.datsans.length; i++) {
                    arrMangOld[i] = data.datsans[i].datsans;
                }
                
                this.mangDatsanOld = arrMangOld;
                this.checkdatsansOld = true;
                this.changeDetectorRef.detectChanges();
            
            }            
        })
    }
    getListDatSanByInnkeeperNew(start_time: string) {
        this.checkdatsansNew = false;
        this.dashboardService.getListDatSanByInnkeeper(start_time).subscribe(data => {
            console.log(data);
            
            if (data.status) {
                this.listdatsancuaquanNew = data.datsans;
                const arrMangNew = new Array();
                for (let i = 0; i < data.datsans.length; i++) {
                    arrMangNew[i] = data.datsans[i].datsans;
                }
                this.mangDatsanNew = arrMangNew;
                this.checkdatsansNew = true;
                this.changeDetectorRef.detectChanges();

            }
        })
    }

    Cancel(){
        this.router.navigate(['/dashboard/quans'])
    }
    Save(){
        console.log(this.timeOld,this.timeNew);
        console.log(this.idsanOld,this.idsanNew);
        if(this.timeOld==""||this.timeNew==""||this.idsanNew==0||this.idsanOld==0){
            Swal.fire({
                icon: 'error',
                title: "bạn chưa chọn đủ thông tin cần chỉnh sữa",
            })
        }else{
            Swal.fire({
                html: '<h1 style="color: #41c04d;">bạn có muốn thay đổi thông tin này hay không?</h1>' +
                    '<table style="width: 100%;">' +
                    '<tr><td style="text-align: center;width: 50%;">tên sân củ</td><td style="text-align: center;width: 50%;">' + this.tensanOld + '</td></tr>' +
                    '<tr><td  style="text-align: center;width: 50%;">tên sân mới</td><td style="text-align: center;width: 50%;">' + this.tensanNew + '</td></tr>' +
                    '<tr><td style="text-align: center;width: 50%;">thời gian củ</td><td style="text-align: center;width: 50%;">' + this.timeOld + '</td></tr>' +
                    '<tr><td style="text-align: center;width: 50%;">thời gian mới</td><td style="text-align: center;width: 50%;">' + this.timeNew + '</td></tr>' +
                    '</table>',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then((result) => {
                if (result.isConfirmed) {
                    const thaydoidatsan = new Thaydoidatsan(this.idsanOld, this.idsanNew, this.timeOld, this.timeNew);
                    this.dashboardService.thayDoiDatSanByInnkeeper(thaydoidatsan).subscribe(data => {
                        console.log(data);

                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'đã lưu thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getListDatSanByInnkeeperOld(this.todayOld);
                            this.getListDatSanByInnkeeperNew(this.todayNew);

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: data.message,
                            })
                        }
                    })
                }
            })
        }
        

    }
    chondatsanOld(gio: number, idsan: number,tensanOld:string) {
        this.idsanOld=idsan;
        this.tensanOld=tensanOld;
        switch (gio) {
            case 0:
                this.timeOld =this.todayOld  + " 05:00:00";
                break;
            case 1:
                this.timeOld = this.todayOld + " 06:00:00";
                break;
            case 2:
                this.timeOld = this.todayOld + " 07:00:00";
                break;
            case 3:
                this.timeOld = this.todayOld + " 08:00:00";
                break;
            case 4:
                this.timeOld = this.todayOld + " 09:00:00";
                break;
            case 5:
                this.timeOld = this.todayOld + " 10:00:00";
                break;
            case 6:
                this.timeOld = this.todayOld + " 11:00:00";
                break;
            case 7:
                this.timeOld = this.todayOld + " 12:00:00";
                break;

            case 8:
                this.timeOld = this.todayOld + " 13:00:00";
                break;
            case 9:
                this.timeOld = this.todayOld + " 14:00:00";
                break;
            case 10:
                this.timeOld = this.todayOld + " 15:00:00";
                break;
            case 11:
                this.timeOld = this.todayOld + " 16:00:00";
                break;

            case 12:
                this.timeOld = this.todayOld + " 17:00:00";
                break;
            case 13:
                this.timeOld = this.todayOld + " 18:00:00";
                break;
            case 14:
                this.timeOld = this.todayOld + " 19:00:00";
                break;
            case 15:
                this.timeOld = this.todayOld + " 20:00:00";
                break;


            default:
                break;
        }
    }

    chondatsanNew(gio: number, idsan: number,tensanNew:string) {
        this.idsanNew = idsan;
        this.tensanNew=tensanNew;
        switch (gio) {
            case 0:
                this.timeNew = this.todayNew + " 05:00:00";
                break;
            case 1:
                this.timeNew = this.todayNew + " 06:00:00";
                break;
            case 2:
                this.timeNew = this.todayNew + " 07:00:00";
                break;
            case 3:
                this.timeNew = this.todayNew + " 08:00:00";
                break;
            case 4:
                this.timeNew = this.todayNew + " 09:00:00";
                break;
            case 5:
                this.timeNew = this.todayNew + " 10:00:00";
                break;
            case 6:
                this.timeNew = this.todayNew + " 11:00:00";
                break;
            case 7:
                this.timeNew = this.todayNew + " 12:00:00";
                break;

            case 8:
                this.timeNew = this.todayNew + " 13:00:00";
                break;
            case 9:
                this.timeNew = this.todayNew + " 14:00:00";
                break;
            case 10:
                this.timeNew = this.todayNew + " 15:00:00";
                break;
            case 11:
                this.timeNew = this.todayNew + " 16:00:00";
                break;

            case 12:
                this.timeNew = this.todayNew + " 17:00:00";
                break;
            case 13:
                this.timeNew = this.todayNew + " 18:00:00";
                break;
            case 14:
                this.timeNew = this.todayNew + " 19:00:00";
                break;
            case 15:
                this.timeNew = this.todayNew + " 20:00:00";
                break;


            default:
                break;
        }
    }
}
