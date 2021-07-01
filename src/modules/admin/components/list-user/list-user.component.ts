import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {AdminService} from '../../services/admin.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User} from '../../models/admin.model'
import { AppCommonService } from '@common/services';
@Component({
    selector: 'sb-list-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list-user.component.html',
    styleUrls: ['list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
    constructor(
        private adminService: AdminService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private appCommonService: AppCommonService,
    ) {}
    checkusers=false;
    users:any;
    ngOnInit() {
        if (this.appCommonService.getToken()) {
            this.page = 1;
            this.getUsersByAdmin(this.page);
        }
   }
    chinhsua=true;
    Cancel() {
        this.chinhsua=true;
    }
    Edit(name: string,phone: string,gmail: string, address: string, password: string) {
        Swal.fire({
            title: "Bạn có muốn thay đổi thông tin này không?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const user = new User(this.user.id,name,phone, gmail, address, password);
                this.adminService.editUserByAdmin(user).subscribe(
                    data => {
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Chỉnh sửa thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getUsersByAdmin(this.page);
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

    getUsersByAdmin(page: number){
        this.search1=true;
        this.chinhsua=true;
        this.checkusers = false;
        this.adminService.getUsersByAdmin("user",page).subscribe(data => {
            if (data.status) {
                this.users = data.users;
                this.tongpage = data.tongpage;
                this.taomangtrang(this.page);
                this.checkusers = true;
                this.changeDetectorRef.detectChanges();

            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
                this.router.navigate(['/admin/quans'])
            }
        })
    }
    thaydoi(user: any) {
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Bạn có muốn thay đổi trạng thái của người dùng này không?</h1>' +
                '<table style="width: 100%;" border="1">' +
                '<tr><td>tên  </td><td>' + user.name + '</td></tr>' +
                '<tr><td>Địa chỉ </td><td>' + user.address + '</td></tr>' +
                '<tr><td>Số điện Thoại </td><td>' + user.phone + '</td></tr>' +
                '<tr><td>Gmail </td><td>' + user.gmail + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `thay đổi`,
        }).then(result => {
            if (result.value) {
                this.adminService.thayDoiTrangThaiUser(user.id).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'thay đổi thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getUsersByAdmin(this.page);
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
            this.getUsersByAdmin(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.getUsersByAdmin(this.page);
        }
    }
    chontrang(page: number) {
        this.page = page;
        this.getUsersByAdmin(this.page);
    }
    user: any;
    
    timkiem="";
    search1=true;
    cailai(user: any) {
        console.log(user);
        
        this.user = user;
        this.chinhsua = false;
    }

    search(){
        this.chinhsua = true;
        this.checkusers = false;
        this.page=1;
        if (!this.timkiem) {
            this.getUsersByAdmin(this.page);      
        }else{
            this.adminService.searchUsersByAdmin("user", this.timkiem).subscribe(data => {
                if (data.status) {
                    this.search1 = false;
                    this.users = data.users;
                    this.checkusers = true;
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
}
