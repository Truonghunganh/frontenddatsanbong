/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { InnkeeperModule } from './innkeeper.module';

/* Containers */
import * as innkeeperContainers from './containers';

/* Guards */
import * as innkeeperGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: innkeeperContainers.InnkeeperComponent,
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/innkeeper/quans',
        //redirectTo: 'quan/:iduser',
    },

    {
        path: 'quans',
        canActivate: [],
        component: innkeeperContainers.DashboardComponent,
    },
    {
        path: 'addquan',
        canActivate: [],
        component: innkeeperContainers.DashboardAddQuanByInnkeeperComponent,
    },
    {
        path: 'editQuan/:idquan',
        canActivate: [],
        component: innkeeperContainers.DashboardEditQuanByTokenInnkeeperComponent,
    },


    {
        path: 'innkeeper',
        canActivate: [],
        component: innkeeperContainers.DashboardInnkeeperComponent,
    },
    {
        path: 'editinnkeeper',
        canActivate: [],
        component: innkeeperContainers.DashboardInnkeeperEditComponent,
    },
    {
        path: 'quans/:idquan',
        canActivate: [],
        component: innkeeperContainers.DashboardGetListSanByTokenInnkeepeAndIdquanComponent,
    },
    {
        path: 'addSan/:idquan',
        canActivate: [],
        component: innkeeperContainers.DashboardAddSanByInnkeeperComponent,
    },

    {
        path: 'editSan/:id',
        canActivate: [],
        component: innkeeperContainers.DashboardEditSanByInnkeeperComponent,
    },
    {
        path: 'doanhthu/:idquan',
        canActivate: [],
        component: innkeeperContainers.DashboardDanhThuByInnkeeperComponent,
    },

    {
        path: 'thaydoidatsan',
        canActivate: [],
        component: innkeeperContainers.DashboardThayDoiDatSanByInnkeeperComponent,
    },


    {
        path: 'thongtindatsan/:idquan',
        canActivate: [],
        component: innkeeperContainers.DashboardThongTinDatSanComponent,
    },

];

@NgModule({
    imports: [InnkeeperModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class InnkeeperRoutingModule {}
