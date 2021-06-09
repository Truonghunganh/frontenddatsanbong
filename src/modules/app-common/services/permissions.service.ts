import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { PermissionRole, PermissionUser } from './../models/app-common.model';
import { AppCommonService } from './app-common.service';

@Injectable()
export class PermissionsService {
    constructor(private http: HttpClient, private appCommonService: AppCommonService) {}

    getListByRole(role: string, page: number): Observable<any> {
        return this.http
            .get<any>(`/api/users/in-role/${role}?page=${page}`, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    // denied : danh sách không cho phép
    // granted : danh sách cho phép
    getNonePermissionsByUser(userId: number): Observable<any> {
        return this.http
            .get<any>(`/api/permissions/users/${userId}/denied`, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    getPermissionsByUser(userId: number): Observable<any> {
        return this.http
            .get<any>(`/api/permissions/users/${userId}/granted`, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    addPermissionsByUser(permissionUser: PermissionUser): Observable<any> {
        return this.http
            .post<any>(`api/permissions/by-user`, permissionUser, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    getListPermissionsByRole(userName: string): Observable<any> {
        return this.http
            .get<any>(`/api/permissions/${userName}/granted`, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    getListNonePermissionsByRole(userName: string): Observable<any> {
        return this.http
            .get<any>(`/api/permissions/${userName}/denied`, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    addPermissionsByRole(permissionRole: PermissionRole): Observable<any> {
        console.log(permissionRole);

        return this.http
            .post<any>(`api/permissions/by-role`, permissionRole, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    removePermissionsByRole(permissionRole: PermissionRole): Observable<any> {
        const httpOptions = {
            headers: this.appCommonService.httpOptions.headers,
            body: permissionRole,
        };
        return this.http.delete<any>(`/api/permissions/by-role`, httpOptions).pipe(
            tap(data => of(data)),
            catchError(this.appCommonService.errorHandler)
        );
    }
}
