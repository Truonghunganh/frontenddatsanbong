import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-thong-tin-dat-san',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-thong-tin-dat-san.component.html',
    styleUrls: ['dashboard-thong-tin-dat-san.component.scss'],
})
export class DashboardThongTinDatSanComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
