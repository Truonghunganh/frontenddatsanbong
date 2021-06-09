/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as adminComponents from './components';

/* Containers */
import * as adminContainers from './containers';

/* Guards */
import * as adminGuards from './guards';

/* Services */
import * as adminServices from './services';

import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        HttpClientModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        FullCalendarModule,
        NavigationModule,
        ChartsModule
    ],
    providers: [...adminServices.services, ...adminGuards.guards],
    declarations: [...adminContainers.containers, ...adminComponents.components],
    exports: [...adminContainers.containers, ...adminComponents.components],
})
export class AdminModule {}
