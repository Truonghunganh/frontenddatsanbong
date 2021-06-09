/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as notificationComponents from './components';

/* Containers */
import * as notificationContainers from './containers';

/* Guards */
import * as notificationGuards from './guards';

/* Services */
import * as notificationServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...notificationServices.services, ...notificationGuards.guards],
    declarations: [...notificationContainers.containers, ...notificationComponents.components],
    exports: [...notificationContainers.containers, ...notificationComponents.components],
})
export class NotificationModule {}
