import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { sideNavItemsI, sideNavSectionsI } from '@modules/navigation/data';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-layout-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-innkeeper.component.html',
    styleUrls: ['layout-innkeeper.component.scss'],
})
export class LayoutInnkeeperComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    sideNavItems = sideNavItemsI;
    sideNavSections = sideNavSectionsI;
    sidenavStyle = 'sb-sidenav-dark';

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef
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

}
