import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-innkeeper.component.html',
    styleUrls: ['dashboard-innkeeper.component.scss'],
})
export class DashboardInnkeeperComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
