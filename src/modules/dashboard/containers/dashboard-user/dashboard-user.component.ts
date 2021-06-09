import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-user.component.html',
    styleUrls: ['dashboard-user.component.scss'],
})
export class DashboardUserComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
