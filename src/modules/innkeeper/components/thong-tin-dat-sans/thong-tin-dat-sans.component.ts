import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InnkeeperService } from "../../services/innkeeper.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan } from '../../models/innkeeper.model'
import { AuthService } from '../../../auth/services/auth.service';


@Component({
    selector: 'sb-thong-tin-dat-sans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './thong-tin-dat-sans.component.html',
    styleUrls: ['thong-tin-dat-sans.component.scss'],
})
export class ThongTinDatSansComponent implements OnInit {
    trangthai=true;
    time = new Date().toISOString().slice(0, 10);
    idquan=0;
    datsans: any;
    checkdatsans=false;


    constructor(
        private dashboardService: InnkeeperService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    ngOnInit() {
        this.time = new Date().toISOString().slice(0, 10)+" 00:00:00";
        this.idquan= Number(this.activatedRoute.snapshot.paramMap.get('idquan'))
        this.checktoken(this.idquan);

    }
    checktoken(idquan: number) {
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            if (!data.status) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
                this.router.navigate(['/innkeeper/quans'])
            } else {
                this.getAllDatSanByInnkeeperAndIdquan(this.idquan,this.trangthai,this.time);
            }
        })
    }
    
    getAllDatSanByInnkeeperAndIdquan(idquan: number,trangthai:boolean,time:string){
        this.page=1;
        this.checkdatsans=false;
        this.dashboardService.getAllDatSanByInnkeeperAndIdquan(idquan,trangthai,time).subscribe(data=>{
            console.log(data);
            if(data.status){
                this.datsans=data.datsans;
                this.taodatsansnew(this.page);
                this.checkdatsans=true;
                this.changeDetectorRef.detectChanges();
                console.log(this.page);
                
            }  
        })
    }
    datsansnew:any;
    page = 1;
    tongpage = 0;
    mangtrang: any;
    taodatsansnew(page: number){
        this.datsansnew=[];
        this.tongpage=this.datsans.length/10;
        let i=(page-1)*10;
        let k;
        if (page < this.tongpage) {
            k = 10;
        } else {
            k = this.datsans.length % 10;
            console.log(k);

        }

        for (let j = 0; j < k; j++) {
            if (j==10) {
                break;
            }
            this.datsansnew.push(this.datsans[i+j]);
            
        }
        console.log(this.datsansnew);
        
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
            this.taodatsansnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taodatsansnew(this.page);
        }
    }
    chontrang(page: number) {
        console.log(page);
        
        this.page = page;
        this.taodatsansnew(this.page);
    }

    xacnhan(iddatsan: number){
        console.log(iddatsan);
        
        this.dashboardService.xacNhanDatsanByInnkeeper(iddatsan).subscribe(data=>{
            console.log(data);
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.getAllDatSanByInnkeeperAndIdquan(this.idquan, this.trangthai, this.time);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        })
        
    }
    deleteDatSan(datsan:any){
        console.log(datsan);
        
    }
    ChangeStatus(){
        
        this.trangthai=!this.trangthai;
        this.getAllDatSanByInnkeeperAndIdquan(this.idquan,this.trangthai,this.time)
    }
}

