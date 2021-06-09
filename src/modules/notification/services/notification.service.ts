import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppCommonService } from '@common/services';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Notification } from './../models/notification.model';

@Injectable()
export class NotificationService {
    constructor(private http: HttpClient, private appCommonService: AppCommonService) {}

    sentNotification(notification: Notification): Observable<any> {
        return this.http
            .post<any>(
                `/api/notifications/admin-push`,
                notification,
                this.appCommonService.httpOptions
            )
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
}
