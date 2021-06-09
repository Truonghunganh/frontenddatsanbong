/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as innkeeperComponents from './components';

/* Containers */
import * as innkeeperContainers from './containers';

/* Guards */
import * as innkeeperGuards from './guards';

/* Services */
import * as innkeeperServices from './services';

import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
import { FullCalendarModule } from '@fullcalendar/angular';

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
        FilePondModule,
        ChartsModule,

    ],
    providers: [...innkeeperServices.services, ...innkeeperGuards.guards],
    declarations: [...innkeeperContainers.containers, ...innkeeperComponents.components],
    exports: [...innkeeperContainers.containers, ...innkeeperComponents.components],
})
export class InnkeeperModule {}
