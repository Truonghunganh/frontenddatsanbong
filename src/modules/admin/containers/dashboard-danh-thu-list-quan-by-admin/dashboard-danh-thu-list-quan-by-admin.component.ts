import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-danh-thu-list-quan-by-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-danh-thu-list-quan-by-admin.component.html',
    styleUrls: ['dashboard-danh-thu-list-quan-by-admin.component.scss'],
})
export class DashboardDanhThuListQuanByAdminComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
