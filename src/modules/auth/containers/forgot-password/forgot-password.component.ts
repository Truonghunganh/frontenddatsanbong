import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { AuthService } from './../../services/auth.service';
@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    constructor( 
        private authService: AuthService,
        private router: Router
        ) {}
    ngOnInit() {
        this.authService.checkTokenUser().subscribe(
            result => {
                if (result.status) {
                    this.router.navigate(['/dashboard/quan']);
                }

            }
        )

    }
}
