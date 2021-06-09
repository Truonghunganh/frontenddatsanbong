import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';
import * as dashboardComponents from './components';

import { environment } from './../../environments/environment';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: dashboardContainers.DashboardComponent,
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/quans',
         //redirectTo: 'quan/:iduser',
    },

    {
        path: 'quans',
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'quans/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardListsanComponent,
    },
    {
        path: 'user',
        canActivate: [],
        component: dashboardContainers.DashboardUserComponent,
    },
    {
        path: 'editUser',
        canActivate: [],
        component: dashboardContainers.DashboardUserEditComponent,
    },
    {
        path: 'home',
        canActivate: [],
        component: dashboardComponents.HomeComponent,
    }

];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {};
