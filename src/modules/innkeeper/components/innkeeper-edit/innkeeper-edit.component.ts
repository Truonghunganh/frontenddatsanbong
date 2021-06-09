import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { InnkeeperService } from "../../services/innkeeper.service";
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Innkeeper } from '../../models/innkeeper.model';

import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-innkeeper-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './innkeeper-edit.component.html',
    styleUrls: ['innkeeper-edit.component.scss'],
})
export class InnkeeperEditComponent implements OnInit {

    
    constructor(
        private dashboardService: InnkeeperService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService

    ) {
    }
    checkInnkeeper=false;
    innkeeper:any;
    ngOnInit() {
        this.checkInnkeeper=false;
        this.authService.checkTokenInnkeeper().subscribe(data=>{
            console.log(data);
            if(data.status){
                this.innkeeper=data.innkeeper;
                this.checkInnkeeper=true;
                this.changeDetectorRef.detectChanges();
            }
            
        })
    }
    Edit(name: string, gmail: string, address: string, password: string){
        Swal.fire({
            title: "bạn có muốn thay đổi thông tin này không?",
            //showCancelButton: true,
            confirmButtonText: 'Lưu',
        }).then((result) => {
            if (result.isConfirmed) {
                const innkeeper=new Innkeeper(name,gmail,address,password);
                console.log(innkeeper);
                this.dashboardService.editInnkeeperByToken(innkeeper).subscribe(
                    data=>{
                        if(data.status){
                            Swal.fire({
                                icon: 'success',
                                title: 'đã lưu thông tin thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.router.navigate(['/dashboard/innkeeper'])
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
