import { Innkeeper } from './../../../innkeeper/models/innkeeper.model';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service'
import { Router } from '@angular/router';

import { AppCommonService } from '../../../app-common/services/app-common.service'

@Component({
    selector: 'sb-layout-innkeeper1',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-innkeeper1.component.html',
    styleUrls: ['layout-innkeeper1.component.scss'],
})
export class LayoutInnkeeper1Component implements OnInit, OnDestroy {
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private appCommonService: AppCommonService,
        private authService: AuthService
    ) {

    }
    subscription: Subscription = new Subscription();
    user: any;
    checkuser = false;

    ngOnInit() {
        this.appCommonService.thaydoiHttpOptions();
        this.authService.checkTokenInnkeeper().subscribe(data => {
            if (data.status) {
                this.user = data.innkeeper;
                this.checkuser = true;
                this.changeDetectorRef.detectChanges();
            } else {
                this.router.navigate(['/auth/login']);
            }
        })
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    dangxuat() {
        this.authService.logout();
    }


}
