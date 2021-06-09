import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-user-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-user-edit.component.html',
    styleUrls: ['dashboard-user-edit.component.scss'],
})
export class DashboardUserEditComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
