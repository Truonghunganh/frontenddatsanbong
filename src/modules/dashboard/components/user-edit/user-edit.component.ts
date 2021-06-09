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
        private router: Router
    
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
        this.checkTokenUser();
    }
    checkTokenUser(){
        this.checkuser=false;
        this.authService.checkTokenUser().subscribe(
            data=>{
                console.log(data);
                if(data.status){
                    this.UserFormGroup.value.name = data.user.name;
                    this.UserFormGroup.value.phone=data.user.phone;
                    this.UserFormGroup.value.gmail=data.user.gmail;
                    this.UserFormGroup.value.address=data.user.address;
                    this.UserFormGroup.value.password=data.user.phone;
                    this.UserFormGroup.value.confirmpassword=data.user.phone;
                    this.changeDetectorRef.detectChanges();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: data.message,
                    })
                    this.router.navigate(['/dashboard/quans']);
                }
                
            }
        )

    }
    Cancel(){
        this.router.navigate(['/dashboard/user']);
    }
    Save(name: string,gmail: string,address: string,password: string){
        console.log(name,gmail,address,password);
        const user =new User(name,gmail,address,password);
        Swal.fire({
            title: "bạn có muốn thay đổi thông tin này không?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                this.dashboardService.editUserByToken(user).subscribe(data => {
                    console.log(data);
                    
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
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
