import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-listsan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-listsan.component.html',
    styleUrls: ['dashboard-listsan.component.scss'],
})
export class DashboardListsanComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
