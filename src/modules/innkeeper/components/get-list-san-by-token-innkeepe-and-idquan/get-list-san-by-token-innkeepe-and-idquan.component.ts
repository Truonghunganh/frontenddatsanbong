import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InnkeeperService } from "../../services/innkeeper.service";
import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'sb-get-list-san-by-token-innkeepe-and-idquan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './get-list-san-by-token-innkeepe-and-idquan.component.html',
    styleUrls: ['get-list-san-by-token-innkeepe-and-idquan.component.scss'],
})
export class GetListSanByTokenInnkeepeAndIdquanComponent implements OnInit {
    constructor(
        private dashboardService: InnkeeperService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }

    idquan = 1;
    sans: any;
    quan: any;
    checkquan=false;
    url = environment.url;
    mangDatsan = new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio: string = "";
    checkdatsan = false;
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));

        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.checkquan=false;
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            console.log(data);

            if (!data.status) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                });
                this.router.navigate(['/innkeeper/quans'])
            } else {
                this.quan=data.quan;
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                this.checkquan=true;
                this.ngayvagio = new Date().toISOString().slice(0, 10);
                this.getDatSansvaSansByInnkeeperAndIdquanAndNgay(this.idquan, this.ngayvagio);
                this.xembinhluan();
            }
        })
    }
    chon(san:any){
        console.log(san.id);
        
    }
    chonngay(ngay: any) {
        this.ngayvagio = ngay.target.value;
        console.log(ngay.target.value);
        this.getDatSansvaSansByInnkeeperAndIdquanAndNgay(this.idquan, ngay.target.value);

    }

    sansTT: any;
    mangTrangthaiSan=new Array<boolean>();
    getDatSansvaSansByInnkeeperAndIdquanAndNgay(idquan: number, ngay: any) {
        this.checkdatsan = false;
        this.dashboardService.getDatSansvaSansByInnkeeperAndIdquanAndNgay(idquan, ngay).subscribe(data => {
            console.log(data.datsans);
            
            if (data.status) {
                this.sansTT=data.sansTT;
                this.mangDatsan = data.datsans;
                this.sans = data.sans;
                for (let i = 0; i <this.sans.length; i++) {
                    this.mangTrangthaiSan[i]=this.sans[i].trangthai;
                }
                this.checkdatsan = true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }

    thaydoi(idsan: number, trangthai:boolean){
        console.log(idsan, trangthai);
        Swal.fire({
            title: "bạn có muốn thay đổi trạng thái sân này hay không?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                this.dashboardService.thayDoiTrangthaiSanByInnkeeper(idsan, trangthai).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Bạn đã thay đổi trạng thái sân thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getDatSansvaSansByInnkeeperAndIdquanAndNgay(this.idquan, this.ngayvagio);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        });
                    }
                })
            }
        })

        
    }
    mangreviewquan: any;
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

    hienthongtindatsan(datsan:any,san:any){
        console.log(datsan);
        Swal.fire({
            html: '<h1 style="color: #41c04d;">thông tin người đặt sân của người dùng</h1><table style="width: 100%;" border="1"><tr><td>Tên khách hàng </td><td>' + 
            datsan.user.name + '</td></tr><tr><td>Số điện thoại khách hàng </td><td>' + 
            datsan.user.phone + '</td></tr><tr><td>Tên sân </td><td>' + 
            san.name + '</td></tr><tr><td>Số người </td><td>' + 
            san.numberpeople + '</td></tr><tr><td>Số tiền thanh toán</td><td>' + 
            san.priceperhour + '</td></tr><tr><td>Giờ đặt sân</td><td>' +datsan.start_time +
             '</td></tr></table>',
            confirmButtonText: `Ok`,
        })
        
        
    }
    hienthibinhluan = "Xem binh luận";
    checkhienthibinhluan = false;
    checkcomments = false;
    comments: any;
    xembinhluan() {
        this.checkcomments = false;
        this.dashboardService.getAllCommentCuaMotQuanByInnkeeper(this.idquan).subscribe(data => {
            console.log(data);

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
    editquan(){
        this.router.navigate(['/innkeeper/editQuan/'+ this.idquan])
    }
    addSan(){
        this.router.navigate(['/innkeeper/addSan/'+ this.idquan]);
    }
    xemdanhthu() {
        this.router.navigate(['/innkeeper/doanhthu/' + this.idquan]);
    } 
    xemdanhsachdatsan(){
        this.router.navigate(['/innkeeper/thongtindatsan/' + this.idquan]);
    }   

    mangBL = new Array();
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
        console.log(this.tongpage, i, k, page);

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
