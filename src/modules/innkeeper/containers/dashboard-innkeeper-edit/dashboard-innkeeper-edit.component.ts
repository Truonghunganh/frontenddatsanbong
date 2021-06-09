import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-innkeeper-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-innkeeper-edit.component.html',
    styleUrls: ['dashboard-innkeeper-edit.component.scss'],
})
export class DashboardInnkeeperEditComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
