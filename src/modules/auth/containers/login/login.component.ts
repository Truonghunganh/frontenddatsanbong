import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User} from './../../models/auth.model';
import Swal from 'sweetalert2';
import {AppCommonService} from '../../../app-common/services/app-common.service';
import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    checklogin=true;
    constructor(
        private appCommonService: AppCommonService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router, 
        private changeDetectorRef: ChangeDetectorRef

    ) {}
    ngOnInit() {
        
        this.checklogin=false;
        this.authService.checkToken().subscribe(
            result => {
                console.log(result);
                
                if (result.status) {
                    if (result.user.role == "user"){
                        this.router.navigate(['/dashboard/quans']);
                    } 
                    if (result.user.role == "innkeeper"){
                        this.router.navigate(['/innkeeper/quans']);
                    } 
                    if (result.user.role == "admin") {
                        this.router.navigate(['/admin/quans']);
                    }
                }else{
                    this.checklogin=true;
                    this.appCommonService.setToken("1");
                    this.changeDetectorRef.detectChanges();
                }
                
            }
        )
    }
    phone="";
    password="";
    onSubmit(phone: string, password: string){
        this.checklogin = false;
        const user = new User(phone, password);
        console.log(user);
        
        this.authService.login(user).subscribe(result => {
            if (result.status) {
                if (result.user.role == "user") this.router.navigate(['/dashboard/quans']);
                if (result.user.role == "innkeeper") this.router.navigate(['/innkeeper/quans']);
                if (result.user.role == "admin") this.router.navigate(['/admin/quans']);
                
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'số điện thoại hay mật khẩu sai !',
                })
                this.checklogin = true;
                this.appCommonService.setToken("1");
                this.changeDetectorRef.detectChanges();
            }
        })
    }
    
}
