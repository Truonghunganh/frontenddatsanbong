import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-edit-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-edit-admin.component.html',
    styleUrls: ['dashboard-edit-admin.component.scss'],
})
export class DashboardEditAdminComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
