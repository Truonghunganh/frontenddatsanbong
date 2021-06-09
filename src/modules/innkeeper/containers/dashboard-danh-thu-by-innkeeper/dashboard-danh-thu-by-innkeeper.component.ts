import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-danh-thu-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-danh-thu-by-innkeeper.component.html',
    styleUrls: ['dashboard-danh-thu-by-innkeeper.component.scss'],
})
export class DashboardDanhThuByInnkeeperComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
