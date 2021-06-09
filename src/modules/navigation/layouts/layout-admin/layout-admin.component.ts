import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { AuthService } from '@modules/auth/services';
import { sideNavItemsA, sideNavSectionsA } from '@modules/navigation/data';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-layout-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-admin.component.html',
    styleUrls: ['layout-admin.component.scss'],
})
export class LayoutAdminComponent implements OnInit, OnDestroy{
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    sideNavItems = sideNavItemsA;
    sideNavSections = sideNavSectionsA;
    sidenavStyle = 'sb-sidenav-dark';

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.subscription.add(
            this.navigationService.sideNavVisible$().subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    dangxuat() {
        this.authService.logout();
    }

}
