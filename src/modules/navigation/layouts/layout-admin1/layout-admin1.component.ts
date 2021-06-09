import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service'
import { Router } from '@angular/router';



@Component({
    selector: 'sb-layout-admin1',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-admin1.component.html',
    styleUrls: ['layout-admin1.component.scss'],
})
export class LayoutAdmin1Component implements OnInit, OnDestroy {
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,

        private authService: AuthService
    ) {

    }
    subscription: Subscription = new Subscription();
    user: any;
    ngOnInit() {
        this.authService.checkTokenAdmin().subscribe(data => {

            if (data.status) {
                this.user = data.admin;
                this.changeDetectorRef.detectChanges();
                console.log(this.user);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
                this.router.navigate(['/auth/login']);
            }
        })
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    thongtin() {
        Swal.fire({
            html: '<div><strong>' + this.user.name + '</strong></div>' +
                '<div><strong>' + this.user.phone + '</strong></div>' +
                '<div><strong>' + this.user.address + '</strong></div>' +
                '<div><strong>' + this.user.gmail + '</strong></div>' +
                '<div><a href="/admin/editadmin">chỉnh sữa thông tin</a></div>',
            showCancelButton: true,
            confirmButtonText: "đăng xuất",
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.logout();
            }
        });

    }

}
