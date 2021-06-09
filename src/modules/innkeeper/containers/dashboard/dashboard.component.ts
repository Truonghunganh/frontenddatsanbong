import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {  Router} from '@angular/router';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {
    }
    addQuan(){
        this.router.navigate(['dashboard/addquan']);
    }
  
}
