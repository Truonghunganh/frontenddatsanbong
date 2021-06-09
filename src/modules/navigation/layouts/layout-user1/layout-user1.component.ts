import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service'
import { Router } from '@angular/router';

@Component({
    selector: 'sb-layout-user1',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-user1.component.html',
    styleUrls: ['layout-user1.component.scss'],
})
export class LayoutUser1Component implements OnInit, OnDestroy  {
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,

        private authService: AuthService
    ) {
        
    }
    subscription: Subscription = new Subscription();
    user:any;
    checkuser=false;
    ngOnInit() {
        this.authService.checkTokenUser().subscribe(data => {
            if (data.status) {
                this.user = data.user;
                this.checkuser=true;
                this.changeDetectorRef.detectChanges();
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
    dangxuat(){
        this.authService.logout();
    }
    
}
