/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { NotificationModule } from './notification.module';

/* Containers */
import * as notificationContainers from './containers';

/* Guards */
import * as notificationGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: notificationContainers.AddComponent,
    },
];

@NgModule({
    imports: [NotificationModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class NotificationRoutingModule {}
