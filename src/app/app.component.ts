import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    // title = 'sb-admin-angular';
    // calendarOptions: CalendarOptions = {
    //     initialView: 'dayGridMonth',
    //     dateClick: this.handleDateClick.bind(this), // bind is important!
    //     events: [
    //         { title: 'event 1', date: '2020-12-12' },
    //         { title: 'event 2', date: '2019-04-02' }
    //     ]
    // };

    // handleDateClick(arg:any) {
    //     alert('date click! ' + arg.dateStr)
    // }
    // constructor(public router: Router, private titleService: Title) {
    //     this.router.events
    //         .pipe(filter(event => event instanceof ChildActivationEnd))
    //         .subscribe(event => {
    //             let snapshot = (event as ChildActivationEnd).snapshot;
    //             while (snapshot.firstChild !== null) {
    //                 snapshot = snapshot.firstChild;
    //             }
    //             this.titleService.setTitle(snapshot.data.title || 'SB Admin Angular');
    //         });
    // }

    a=true;
    messages: string[] = [];
    message: string = '';
    updateMesssages() {
        this.messages.push(this.message);
        this.message = '';
      //  console.log(this.messages);
        this.a=!this.a;
        //console.log(this.a);
        
    }
}
