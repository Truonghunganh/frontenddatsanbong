import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/admin.model'

@Component({
    selector: 'sb-list-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list-innkeeper.component.html',
    styleUrls: ['list-innkeeper.component.scss'],
})
export class ListInnkeeperComponent implements OnInit {
    constructor(
        private adminService: AdminService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) { }
    deleteUser(user: any){
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Bạn có muốn xóa chủ sân này không</h1>'+
            '<table style="width: 100%;" border="1">'+
            '<tr><td>tên  </td><td>' + user.name + '</td></tr>'+
            '<tr><td>Địa chỉ </td><td>' + user.address + '</td></tr>'+
            '<tr><td>Số điện Thoại </td><td>' + user.phone + '</td></tr>'+
            '<tr><td>Gmail </td><td>'+ user.gmail + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `Xóa chủ sân`,
        }).then(result => {
            if (result.value) {
                this.adminService.xoaUsersByAdmin(user.id).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',
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
    checkusers = false;
    users: any;
    ngOnInit() {
        this.page = 1;
        this.getUsersByAdmin(this.page);
    }
    chinhsua = true;
    Cancel() {
        this.chinhsua = true;
    }
    Edit(name: string, phone: string, gmail: string, address: string, password: string) {
        Swal.fire({
            title: "Bạn có muốn thay đổi thông tin này không?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const user = new User(this.user.id, name, phone, gmail, address, password);
                this.adminService.editUserByAdmin(user).subscribe(
                    data => {
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'chỉnh sửa thành công',
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

    getUsersByAdmin(page: number) {
        this.search1 = true;
        this.chinhsua = true;
        this.checkusers = false;
        this.adminService.getUsersByAdmin("innkeeper", page).subscribe(data => {
            console.log(data);
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
    cailai(user: any) {
        this.user = user;
        this.chinhsua = false;
    }
    timkiem = "";
    search1 = true;
    search() {
        console.log(this.timkiem);
        this.chinhsua = true;
        this.checkusers = false;
        this.page = 1;
        this.adminService.searchUsersByAdmin("innkeeper", this.timkiem).subscribe(data => {
            console.log(data);
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
                this.router.navigate(['/admin/quans'])
            }
        })
    }

}
