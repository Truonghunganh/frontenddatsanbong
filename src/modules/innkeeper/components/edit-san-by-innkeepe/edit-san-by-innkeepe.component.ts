import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InnkeeperService } from "../../services/innkeeper.service";
import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { San1 } from '../../models/innkeeper.model';

import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-edit-san-by-innkeepe',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-san-by-innkeepe.component.html',
    styleUrls: ['edit-san-by-innkeepe.component.scss'],
})
export class EditSanByInnkeepeComponent implements OnInit {
    checksan=false;
    san:any;
    constructor(
        private dashboardService: InnkeeperService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,

    ) {}
    id=0;
    idquan=0;
    checkquan=false;
    quan:any;
    url = environment.url;
    ngOnInit() {
        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.getSanByInnkeeper(this.id);
    }
    getSanByInnkeeper(id:number){
        this.checkquan=false;
        this.checksan=false;
        this.dashboardService.getSanByInnkeeperVaId(id).subscribe(
            data=>{
                if (data.status) {
                   this.idquan=data.san.idquan;
                   this.san = data.san;
                   this.checksan=true;
                   this.quan = data.quan;
                   this.reviewquan = Math.round(data.quan.review);
                   this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                   this.checkquan=true;
                   this.changeDetectorRef.detectChanges();
                } else {
                   this.router.navigate(['/innkeeper/quans']);
                }
           }
            
        )
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
        this.router.navigate(['/innkeeper/quans/' + this.idquan]);
    }
    edit(name: string, numberpeople: number, priceperhour:number){
        
        Swal.fire({
            title: "bạn có muốn thay đổi thông tin của sân này hay không?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const san = new San1(this.id, name, Number(numberpeople), Number(priceperhour));
                this.dashboardService.editSanByInnkeeper(san).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/innkeeper/quans/'+this.idquan])
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
