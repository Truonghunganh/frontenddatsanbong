import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import{ AdminService } from "../../services/admin.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan } from '../../models/admin.model'
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'sb-list-sans-by-id-quan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list-sans-by-id-quan.component.html',
    styleUrls: ['list-sans-by-id-quan.component.scss'],
})
export class ListSansByIdQuanComponent implements OnInit {
    constructor(
        private dashboardService: AdminService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    idquan = 1;
    sans: any;
    quan: any;
    chekquanvasan= false;
    url = environment.url;
    mangDatsan = new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio: string = "";
    checkdatsans = false;
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        this.ngayvagio = new Date().toISOString().slice(0, 10);
        this.getDatSansvaSansByAdminAndIdquanAndNgay(this.idquan, this.ngayvagio);
    }
    chonngay(ngay: any) {
        this.ngayvagio = ngay.target.value;
        console.log(ngay.target.value);
        this.getDatSansvaSansByAdminAndIdquanAndNgay(this.idquan, ngay.target.value);

    }

    checkhienthibinhluan = false;
    checkcomments = false;
    comments: any;
    xembinhluan() {
        this.checkhienthibinhluan = !this.checkhienthibinhluan;
        if (this.checkhienthibinhluan) {
            this.checkcomments = false;
            this.dashboardService.getAllCommentCuaMotQuanByAdmin(this.idquan).subscribe(data => {
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
    }
    sansTT: any;
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

    getDatSansvaSansByAdminAndIdquanAndNgay(idquan: number, ngay: any) {
        this.checkdatsans = false;
        this.dashboardService.getDatSansvaSansByAdminAndIdquanAndNgay(idquan, ngay).subscribe(data => {
            if (data.status) {
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                if (!this.chekquanvasan) {
                    this.quan = data.quan;
                    this.sans = data.sans;
                    this.sansTT= data.sansTT;
                    this.chekquanvasan = true;
                }
                this.mangDatsan = data.datsans;
                this.checkdatsans = true;
                this.xembinhluan();

                this.changeDetectorRef.detectChanges();
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

    hienthongtindatsan(datsan: any, san: any) {
        console.log(datsan);
        Swal.fire({
            html: '<h1 style="color: #41c04d;">thông tin người đặt sân của người dùng</h1><table style="width: 100%;" border="1"><tr><td>tên người đặt </td><td>' + datsan.user.name + '</td></tr><tr><td>Số điện thoại người đặt </td><td>' + datsan.user.phone + '</td></tr><tr><td>tên sân </td><td>' + san.name + '</td></tr><tr><td>số người </td><td>' + san.numberpeople + '</td></tr><tr><td>số tiền thanh toán</td><td>' + san.priceperhour + '</td></tr><tr><td>giờ đặt</td><td>' + datsan.start_time + '</td></tr></table>',
            confirmButtonText: `Ok`,
        })
    }

    xemdoanhthu() {
        this.router.navigate(['admin/doanhthu/' + this.idquan]);
    }

}


