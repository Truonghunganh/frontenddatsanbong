import { AppCommonService } from './../../../app-common/services/app-common.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/dashboard.model';
import Swal from 'sweetalert2';

import { AuthService } from '../../../auth/services/auth.service'



@Component({
    selector: 'sb-user-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-edit.component.html',
    styleUrls: ['user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
    UserFormGroup: any;

    checkuser = false;
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private appCommonService: AppCommonService,
    
    ) {}
    ngOnInit() {
        this.UserFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            phone:['', Validators.required],

            gmail: ['', Validators.required],
            address: ['', Validators.required],
            password: ['', Validators.required],
            confirmpassword: ['', Validators.required],
        });
        if (this.appCommonService.getToken()) {
            this.checkTokenUser();
        }

    }
    checkTokenUser(){
        this.checkuser=false;
        this.authService.checkTokenUser().subscribe(
            data=>{
                if(data.status){
                    this.UserFormGroup.value.name = data.user.name;
                    this.UserFormGroup.value.phone=data.user.phone;
                    this.UserFormGroup.value.gmail=data.user.gmail;
                    this.UserFormGroup.value.address=data.user.address;
                    this.UserFormGroup.value.password=data.user.phone;
                    this.UserFormGroup.value.confirmpassword=data.user.phone;
                    this.changeDetectorRef.detectChanges();
                } else {
                    this.router.navigate(['/dashboard/quans']);
                }
                
            }
        )

    }
    Cancel(){
        this.router.navigate(['/dashboard/user']);
    }
    Save(name: string,gmail: string,address: string,password: string){
        const user =new User(name,gmail,address,password);
        Swal.fire({
            title: "b???n c?? mu???n thay ?????i th??ng tin n??y kh??ng?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                this.dashboardService.editUserByToken(user).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'b???n ???? l??u th??ng tin th??ng c??ng',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/dashboard/quans'])
                        this.changeDetectorRef.detectChanges();
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
