import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan} from '../../models/dashboard.model' 
import {AuthService} from '../../../auth/services/auth.service';
import { formatDate } from '@angular/common';
@Component({
    selector: 'sb-dashboard-tablesan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-tablesan.component.html',
    styleUrls: ['dashboard-tablesan.component.scss'],
})
export class DashboardTablesanComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    idquan=1;
    sans: any;
    chekquanvasan= false;
    checkdatsans = false;
    quan:any;
    url = environment.url;
    mangDatsan=new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio:string="";
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        this.ngayvagio = new Date().toISOString().slice(0, 10);
        this.getDatSansvaSansByUserAndIdquanAndNgay(this.idquan, this.ngayvagio);
        this.xembinhluan();
    }
    chonngay(ngay :any){
        this.ngayvagio = ngay.target.value;
        this.getDatSansvaSansByUserAndIdquanAndNgay(this.idquan, ngay.target.value);
        
    }
    sansTT: any;
    getDatSansvaSansByUserAndIdquanAndNgay(idquan: number, ngay: any){
        this.checkdatsans = false;
        this.dashboardService.getDatSansvaSansByUserAndIdquanAndNgay(idquan, ngay).subscribe(data=>{
            if (data.status){
                this.sansTT= data.sansTT;
                this.mangDatsan=data.datsans;
                this.reviewuser = Math.round(data.reviewcuauser);
                this.mangreviewuser = this.taomotmangreview(this.reviewuser);
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                if(!this.chekquanvasan){
                    this.quan = data.quan;
                    this.sans = data.sans;
                    this.chekquanvasan=true;
                }
                this.checkdatsans= true;
                this.changeDetectorRef.detectChanges();
            }else{
                this.router.navigate(['/dashboard/quans']);
            }
        })
    }

    updatereview(){
        this.nutReview=!this.nutReview;
        if (this.nutReview) {
            this.strNutReview = "OK";
            //this.changeDetectorRef.detectChanges();

        } else {
            this.strNutReview = "Review";
            this.dashboardService.reviewByUser(this.idquan, this.reviewuser).subscribe(data => {
                if (data.status) {
                    Swal.fire({
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.getDatSansvaSansByUserAndIdquanAndNgay(this.idquan, this.ngayvagio);
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: data.message,
                    })
                }
            });
        }
        
    }
    nutReview=false;
    strNutReview="Review";
    chonreview(review: number){
        console.log(review);
        
        this.mangreviewuser=this.taomotmangreview(review);
        this.reviewuser= review;
    }
    mangreviewquan: any;
    mangreviewuser: any;
    reviewuser = 0;
    reviewquan = 0;

    taomotmangreview(review: number) {
        switch (review) {
            case 0: return [false, false, false, false, false];
            case 1: return [true, false, false, false, false];
            case 2: return [true, true, false, false, false];
            case 3: return [true, true, true, false, false];
            case 4: return [true, true, true, true, false];
            case 5: return [true, true, true, true, true];
            default:
                break;
        }
    }

    datsan(gio: number, idsan: number, priceperhour: number, namesan: string, numberpeople:number){
        let ngay = this.ngayvagio.substr(0,10);
        switch (gio) {
            case 0:
                this.ngayvagio = ngay + " 05:00:00";
                break;
            case 1:
                this.ngayvagio = ngay + " 06:00:00";
                break;
            case 2:
                this.ngayvagio = ngay + " 07:00:00";
                break;
            case 3:
                this.ngayvagio = ngay + " 08:00:00";
                break;
            case 4:
                this.ngayvagio = ngay + " 09:00:00";
                break;
            case 5:
                this.ngayvagio = ngay + " 10:00:00";
                break;
            case 6:
                this.ngayvagio = ngay + " 11:00:00";
                break;
            case 7:
                this.ngayvagio = ngay + " 12:00:00";
                break;

            case 8:
                this.ngayvagio = ngay + " 13:00:00";
                break;
            case 9:
                this.ngayvagio = ngay + " 14:00:00";
                break;
            case 10:
                this.ngayvagio = ngay + " 15:00:00";
                break;
            case 11:
                this.ngayvagio = ngay + " 16:00:00";
                break;

            case 12:
                this.ngayvagio = ngay + " 17:00:00";
                break;
            case 13:
                this.ngayvagio = ngay + " 18:00:00";
                break;
            case 14:
                this.ngayvagio = ngay + " 19:00:00";
                break;
            case 15:
                this.ngayvagio = ngay + " 20:00:00";
                break;


            default:
                break;
        }
        if (!(this.ngayvagio > formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US'))) {
            Swal.fire({
                icon: 'error',
                text: 'ngày giờ đặt sân trước ngày giờ hiện tại',
            })
        }else{
            Swal.fire({
                html: '<h1 style="color: #41c04d;">thông tin sân mà bạn muốn đặt</h1><table style="width: 100%;" border="1"><tr><td>tên quán </td><td>' + this.quan.name + '</td></tr><tr><td>tên sân </td><td>' + namesan + '</td></tr><tr><td>số người </td><td>' + numberpeople + '</td></tr><tr><td>số tiền thanh toán</td><td>' + priceperhour + '</td></tr><tr><td>giờ đặt</td><td>' + this.ngayvagio + '</td></tr></table>',
                confirmButtonText: `thanh toán`,
            }).then(result => {
                if (result.value) {
                    const ds = new Datsan(idsan, this.ngayvagio, priceperhour);
                    this.dashboardService.addDatSan(ds).subscribe(data => { 
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bạn đã đặt sân thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getDatSansvaSansByUserAndIdquanAndNgay(this.idquan, ngay);
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: data.message,
                            })
                        }
                    });
                } 
            });
            
        }

    }
    checkcomments=false;
    comments: any;
    xembinhluan(){
        this.checkcomments = false;
        this.page= 1;
        this.dashboardService.getAllCommentCuaMotQuan(this.idquan).subscribe(data => {
            if (data.status) {
                this.comments = data.comments;
                for (let i = 0; i < this.comments.length; i++) {
                    this.mangreview[i] = this.taomotmangreview(Math.round(this.comments[i].review));
                    this.mangBL[i] = false;
                }
                this.tongpage = this.comments.length / 10 + 1;
                this.taoBLnew(this.page);
                this.checkcomments = true;
                this.changeDetectorRef.detectChanges();
            } 
        })
    }
    binhluan ="";
    binhluancuaban(){
        this.page=1;
        this.dashboardService.addComment(this.idquan, this.binhluan).subscribe(data =>{
            if (data.status) {
                this.comments = data.comments;
                for (let i = 0; i < this.comments.length; i++) {
                    this.mangreview[i] = this.taomotmangreview(Math.round(this.comments[i].review));
                    this.mangBL[i] = false;
                }
                this.tongpage = this.comments.length / 10 + 1;
                this.taoBLnew(this.page);
                this.checkcomments = true;
                this.changeDetectorRef.detectChanges();
            } 
            
            this.binhluan="";
        });
        this.binhluan = "";
    }
    // values = ['AM', 'PM'];
    // defaultValue = this.values[1];

    // select(){
    //     select.options[0].selected = true;
    // }
    mangreview = new Array();
    xoabinhluan(id:number){
        Swal.fire({
            title: 'ban có chắc muốn xóa bình luận này không ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'xóa'
        }).then((result) => {
            if (result.isConfirmed) {
                this.dashboardService.xoaComment(id).subscribe(data=>{
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'đã xóa bình luận thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.comments = data.comments;
                        this.page=1;
                        this.tongpage = this.comments.length / 10 + 1;
                        this.taoBLnew(this.page);
                        this.checkcomments = true;
                        this.changeDetectorRef.detectChanges();
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
    
    chinhsuaBL(vitri: number,id: number, binhluan: string){
        this.mangBL[vitri]=false;
        this.dashboardService.updateComment(id, binhluan).subscribe(data=>{
            if (data.status) {
                this.comments = data.comments;
                this.tongpage = this.comments.length / 10 + 1;
                this.taoBLnew(this.page);
                this.checkcomments = true;
                this.changeDetectorRef.detectChanges();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
            }
        })
    }
    chon(i: number){
        for (let k = 0; k < this.mangBL.length; k++) {
            this.mangBL[k]=false;
            
        }
        this.mangBL[i]=true;

    }
    mangBL= new Array();
    page = 1;
    tongpage = 0;
    mangBLNew: any;
    mangtrang: any;
    taoBLnew(page: number) {
        this.mangBLNew = [];
        this.tongpage = this.comments.length / 10;
        let i = (page - 1) * 10;
        let k;
        if (page < this.tongpage) {
            k = 10;
        } else {
            k = this.comments.length % 10;

        }
        for (let j = 0; j < k; j++) {
            if (j == 10) {
                break;
            }
            this.mangBLNew.push(this.comments[i + j]);

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
            this.taoBLnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taoBLnew(this.page);
        }
    }
    chontrang(page: number) {
        this.page = page;
        this.taoBLnew(this.page);
    }

}
