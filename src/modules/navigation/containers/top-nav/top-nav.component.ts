import { NavigationService } from '@modules/navigation/services';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service'
import { AppCommonService } from '../../../app-common/services/app-common.service'
import { Router } from '@angular/router';
@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(
        private navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private appCommonService: AppCommonService,
        private authService: AuthService
    ) {

    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }

    user: any;
    checkuser=false;
    ngOnInit() {
        this.checkuser=false;
        if (this.appCommonService.getToken()){
            this.authService.checkTokenAdmin().subscribe(data => {
                if (data.status) {
                    this.user = data.admin;
                    this.checkuser = true;
                    this.changeDetectorRef.detectChanges();
                } else {
                    this.appCommonService.logout();
                    this.router.navigate(['/auth/login']);
                }
            })
        } else {
            this.router.navigate(['/auth/login']);
        }
        
    }
    dangxuat() {
        this.authService.logout();
    }

}
