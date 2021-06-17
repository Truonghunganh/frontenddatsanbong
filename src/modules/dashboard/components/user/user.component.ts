import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {  Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';


@Component({
    selector: 'sb-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user.component.html',
    styleUrls: ['user.component.scss'],
})
export class UserComponent implements OnInit {
    ListDatSanByIduservaonhungngaytoi: any;
    checklistdansan = false;
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService
    ) { }
    ngOnInit() {
        this.getListDatSanByUserToken();
    }
    
    getListDatSanByUserToken() {
        this.page=1;
        this.checklistdansan = false;
        this.dashboardService.getListDatSanByUserToken().subscribe(data => {
            if (data.status) {
                this.ListDatSanByIduservaonhungngaytoi = data.datsans;
                this.taodatsansnew(this.page);
                this.checklistdansan = true;
                this.changeDetectorRef.detectChanges();
            }
             
        })
    }
    datsansnew: any;
    page = 1;
    tongpage = 0;
    mangtrang: any;
    taodatsansnew(page: number) {
        this.datsansnew = [];
        this.tongpage = this.ListDatSanByIduservaonhungngaytoi.length / 10;
        let i = (page - 1) * 10;
        let k;
        if (page<this.tongpage){
            k = 10;
        }else{
            k = this.ListDatSanByIduservaonhungngaytoi.length %10;
            console.log(k);
            
        }
        for (let j = 0; j<k; j++) {
            if (j == 10) {
                break;
            }
            this.datsansnew.push(this.ListDatSanByIduservaonhungngaytoi[i + j]);

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


    taomangtrangNew(page: number) {
        var mang: Array<boolean> = [];
        if(this.tongpage>3){
            
        }
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
            this.taodatsansnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taodatsansnew(this.page);
        }
    }
    chontrang(page: number) {
        this.page = page;
        this.taodatsansnew(this.page);
    }

    editUser(){
        this.router.navigate(['/dashboard/edituser']);
        
    }
    deleteDatSan(datsan:any){
        // if (!(this.ngayvagio > formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US'))) {
        //     Swal.fire({
        //         icon: 'error',
        //         text: 'ngày giờ đặt sân trước ngày giờ hiện tại',
        //     })
        // }
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Bạn có muốn xóa đặt sân này không</h1><table style="width: 100%;" border="1"><tr><td>tên quán </td><td>' + datsan.nameQuan + '</td></tr><tr><td>Địa chỉ quán </td><td>' + datsan.addressQuan + '</td></tr><tr><td>Số điện Thoại Quán </td><td>' + datsan.phoneQuan + '</td></tr><tr><td>tên sân </td><td>' + datsan.nameSan + '</td></tr><tr><td>số người </td><td>' + datsan.numberpeople + '</td></tr><tr><td>số tiền thanh toán</td><td>' + datsan.price + '</td></tr><tr><td>giờ đặt</td><td>' + datsan.time + '</td></tr><tr><td>xác nhận chủ quán</td><td>' + datsan.xacnhan + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `Xóa đặt sân`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.deleteDatSan(datsan.id).subscribe(data => {
                    console.log(data);
                    
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });       
                        this.getListDatSanByUserToken();
                    }
                });
            }
        });
    }

}
