/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { AdminModule } from './admin.module';

/* Containers */
import * as adminContainers from './containers';

/* Guards */
import * as adminGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: adminContainers.AdminComponent,
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/admin/quans',
    },

    {
        path: 'quans',
        canActivate: [],
        component: adminContainers.DashboardListQuansByAdminComponent,
    },
    {
        path: 'admin',
        canActivate: [],
        component: adminContainers.DashboardAdminComponent,
    },
    {
        path: 'editadmin',
        canActivate: [],
        component: adminContainers.DashboardEditAdminComponent,
    },
    {
        path: 'quans/:idquan',
        canActivate: [],
        component: adminContainers.DashboardListSansByIdQuanComponent,
    },
    {
        path: 'doanhthu/:idquan',
        canActivate: [],
        component: adminContainers.DashboardDanhThuOfQuanComponent,
    },
    {
        path: 'doanhthulistquan',
        canActivate: [],
        component: adminContainers.DashboardDanhThuListQuanByAdminComponent,
    },
    {
        path: 'doanhthucuaadmintheonam',
        canActivate: [],
        component: adminContainers.DashboardDoanhThuCuaAdminTheoNamComponent,
    },
    {
        path: 'users',
        canActivate: [],
        component: adminContainers.ĐashboardListUserComponent,
    },
    {
        path: 'innkeepers',
        canActivate: [],
        component: adminContainers.ĐashboardListInnkeeperComponent,
    },

];

@NgModule({
    imports: [AdminModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
