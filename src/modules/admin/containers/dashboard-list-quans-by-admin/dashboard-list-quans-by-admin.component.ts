import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-list-quans-by-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-list-quans-by-admin.component.html',
    styleUrls: ['dashboard-list-quans-by-admin.component.scss'],
})
export class DashboardListQuansByAdminComponent implements OnInit {
    constructor() {}
    ngOnInit() {
        
    }
}
