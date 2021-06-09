import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
    dayGridPlugin,
    interactionPlugin
]);
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, StorageServiceModule, FullCalendarModule],
    providers: [],
    // schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule {}
