import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { InnkeeperService } from "../../services/innkeeper.service";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Innkeeper, San } from '../../models/innkeeper.model';

import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-add-san-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-san-by-innkeeper.component.html',
    styleUrls: ['add-san-by-innkeeper.component.scss'],
})
export class AddSanByInnkeeperComponent implements OnInit {
    constructor(
        private dashboardService: InnkeeperService,
        private router: Router,
        private activatedRoute: ActivatedRoute, 
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {}
    ngOnInit() {
        this.idquan=Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.idquan);
        
        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkquan=false;
    quan:any;
    url = environment.url;
    idquan=0;
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.checkquan = false;
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            if (!data.status) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                });
                this.router.navigate(['/innkeeper/quans' ])
            } else {
                this.quan = data.quan;
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                this.checkquan = true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }
    mangreviewquan: any;
    reviewquan = 0;

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

    Cancel(){
        this.router.navigate(['/innkeeper/quans/'+this.idquan]);
    }
    Add(name:string, numberpeople:number, priceperhour: number){
        const san=new San(this.idquan,name,numberpeople,priceperhour);
        console.log(san);
        Swal.fire({
            title: "bạn có muốn thêm sân này không?",
            showCancelButton: true,
            confirmButtonText: 'Thêm',
        }).then((result) => {
            if (result.isConfirmed) {
                this.dashboardService.addSanByInnkeeper(san).subscribe(data => {
                    console.log(data);

                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'bạn đã thêm thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/innkeeper/quans/' + this.idquan]);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })
                    }
                })
            }
        }) 
    }
}
