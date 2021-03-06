import { AppCommonService } from '@common/services';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {User1} from '../../models/auth.model';
import {AuthService} from '../../services/auth.service'
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    constructor(
        private appCommonService: AppCommonService,
        private changeDetectorRef : ChangeDetectorRef,
        private authService: AuthService,
        private router: Router,
        )
    {
    }
    
    checkregister=false;
    ngOnInit() {
        this.checkregister=false;
        //this.appCommonService.thaydoiHttpOptions();
        if(this.appCommonService.getToken()){
            this.authService.checkToken().subscribe(
                result => {
                    if (result.status) {
                        if (result.user.role == "user") this.router.navigate(['/dashboard/quans']);
                        if (result.user.role == "innkeeper") this.router.navigate(['/innkeeper/quans']);
                        if (result.user.role == "admin") this.router.navigate(['/admin/quans']);
                    } else {
                        this.checkregister = true;
                        this.changeDetectorRef.detectChanges();
                    }
                }
            )
        } else {
            this.checkregister = true;
            this.changeDetectorRef.detectChanges();
        }
    }
    Cancel(){
        this.router.navigate(['/dashboard/home']);

    }
    RegisterUser(role:string,name: string,phone: string,gmail: string,address: string,password: string){
        const user = new User1(role,name,phone,gmail,address,password);
        this.checkregister=false;
        this.authService.Register(user).subscribe(data =>{
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(['/auth/login'])
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
                this.checkregister=true;
                this.changeDetectorRef.detectChanges();
            }

        });
    }
}
