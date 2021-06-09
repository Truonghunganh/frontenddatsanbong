import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
@Component({
    selector: 'sb-dashboard-listquans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-listquans.component.html',
    styleUrls: ['dashboard-listquans.component.scss'],
})
export class DashboardListquansComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef

        ) {}
    quans: any;
    checkquans=false;
    url = environment.url;
    urlCLU= environment.urlCLU;
    ngOnInit() {
        this.getListquans();
    }

    mangreview=new Array();

    getListquans() {
        this.checkquans= false;
        this.dashboardService.getListQuansChoUser().subscribe(data=>{
            if(data.status){
                this.quans=data.quans;
                for (let i = 0; i < this.quans.length; i++) {
                    this.mangreview[i]=this.taomotmangreview(Math.round(this.quans[i].review))                  
                }
                this.checkquans=true;
                this.taoquansnew(this.page);
                this.changeDetectorRef.detectChanges();
            }
        })
    }
    hienthivitricuaminh=true;
    timkiem="";
    search() {
        this.hienthivitricuaminh=false;
        this.checkquans =false;
        this.page=1;
        this.authService.searchListQuans(this.timkiem).subscribe(data=>{
            if (data.status) {
                this.quans = data.quans;
                for (let i = 0; i < this.quans.length; i++) {
                    this.mangreview[i] = this.taomotmangreview(Math.round(this.quans[i].review))
                }
                this.checkquans = true;
                this.taoquansnew(this.page);
                this.changeDetectorRef.detectChanges();
            }
        })   
        this.timkiem="";
    }

    taomotmangreview(review: number){
        switch (review) {
            case 0:return [false, false, false, false, false];
            case 1:return [true , false, false, false, false];
            case 2:return [true , true , false, false, false];
            case 3:return [true , true , true , false, false];
            case 4:return [true , true , true , true , false];
            case 5:return [true , true , true , true , true];
            default:
                break;
        }
    }
    page = 1;
    tongpage = 0;
    mangtrang: any;
    quansnew: any;
    soluongtrentrang=3;
    taoquansnew(page: number) {
        this.quansnew = [];
        this.tongpage = this.quans.length / this.soluongtrentrang;
        let i = (page - 1) * this.soluongtrentrang;
        let k;
        if (page < this.tongpage) {
            k = this.soluongtrentrang;
        } else {
            k = this.quans.length % this.soluongtrentrang;
        }
        for (let j = 0; j < k; j++) {
            if (j == this.soluongtrentrang) {
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
        this.page = page;
        this.taoquansnew(this.page);
    }

}
