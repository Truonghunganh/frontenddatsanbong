import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
