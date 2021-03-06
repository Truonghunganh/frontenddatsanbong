import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppCommonService } from '@common/services';
import { InnkeeperService } from "../../services/innkeeper.service";
import { environment } from './../../../../environments/environment';

@Component({
    selector: 'sb-get-quans-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './get-quans-by-innkeeper.component.html',
    styleUrls: ['get-quans-by-innkeeper.component.scss'],
})
export class GetQuansByInnkeeperComponent implements OnInit {
    constructor(
        private dashboardService: InnkeeperService,
        private changeDetectorRef: ChangeDetectorRef,
        private appCommonService: AppCommonService

    ) { }
    quans: any;
    checkquans = false;
    url = environment.url;
    urlCLU = environment.urlCLU;
    ngOnInit() {
        if (this.appCommonService.tokenSai!=false) {
            this.appCommonService.tokenSai=false;
            this.appCommonService.resetHttpOptions();
            this.changeDetectorRef.detectChanges();
        }
        if (this.appCommonService.getToken()) {
            try {
                this.appCommonService.httpOptions.headers.get("token");
            } catch (error) {
                this.appCommonService.resetHttpOptions();
            }
            this.getListquans();
        }
    }
    hienthivitricuaminh = true;
    user="innkeeper";
    getListquans() {
        this.checkquans= false;
        this.dashboardService.getListQuansByTokenInnkeeper().subscribe(data=>{
            if(data.status){
                this.quans=data.quans;
                for (let i = 0; i < this.quans.length; i++) {
                    this.mangreview[i] = this.taomotmangreview(Math.round(this.quans[i].review))
                }
                this.taoquansnew(this.page);
                this.checkquans=true;
                this.changeDetectorRef.detectChanges();

            }
        })
    }
    mangreview = new Array();

    taomotmangreview(review: number) {
        switch (review) {
            case 0: return [false, false, false, false, false];
            case 1: return [true, false, false, false, false];
            case 2: return [true, true, false, false, false];
            case 3: return [true, true, true, false, false];
            case 4: return [true, true, true, true, false];
            case 5: return [true, true, true, true, true];
            default:
                break;
        }
    }
    page = 1;
    tongpage = 0;
    mangtrang: any;
    quansnew: any;
    taoquansnew(page: number) {
        this.quansnew = [];
        this.tongpage = this.quans.length / 3;
        let i = (page - 1) * 3;
        let k;
        if (page <= this.tongpage) {
            k = 3;
        } else {
            k = this.quans.length % 3;

        }
        for (let j = 0; j < k; j++) {
            if (j == 3) {
                break;
            }
            this.quansnew.push(this.quans[i + j]);
        }
        this.taomangtrang(page);
    }
    taomangtrang(page: number) {
        var mang: Array<boolean> = [];
        for (let i = 0; i < this.tongpage; i++) {
            mang.push(false);

        }
        mang[page - 1] = true;
        this.mangtrang = mang;

    }
    Previous() {
        if (this.page > 1) {
            this.page--;
            this.taoquansnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taoquansnew(this.page);
        }
    }
    chontrang(page: number) {
        console.log(page);

        this.page = page;
        this.taoquansnew(this.page);
    }

}
