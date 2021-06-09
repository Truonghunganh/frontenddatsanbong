import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {User,User1} from "../models/auth.model"
import { environment } from './../../../environments/environment';
import { AppCommonService } from './../../app-common/services/app-common.service';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        private router: Router
    ) {
//        this.adminSubject = new BehaviorSubject<Admin1>(JSON.parse(this.storage.get('admin')));
    }
  //  private adminSubject: any;
    logout() {
        this.storage.set('token', JSON.stringify(1));
        this.router.navigate(['dashboard/home']);

    }
    checkToken(): Observable<any> {
        return this.http.get<any>(environment.url + '/api/v1/checkToken', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC92MVwvZWRpdFVzZXJCeVRva2VuIiwiaWF0IjoxNjE4NTM4MTA0LCJleHAiOjE2MTg1NDE3MDQsIm5iZiI6MTYxODUzODEwNCwianRpIjoiRDJ1YTlVYjdUd3U2eVdkQyIsInN1YiI6MSwicHJ2IjoiZWMxZjEyOTA0N2RhMmQzZGI3OWU5OTdlMzkzMTRiOTUzNTc2N2RkNiJ9.i5uW9pOIQPBO3Ab5r8wA1wG6gD459VIDisvRelyj5jM"
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC92MVwvZWRpdFVzZXJCeVRva2VuIiwiaWF0IjoxNjE4NTQ5MTU4LCJleHAiOjE2MTg1NTI3NTgsIm5iZiI6MTYxODU0OTE1OCwianRpIjoiQVVjSjBsVUlXSzZVcXpRVSIsInN1YiI6MSwicHJ2IjoiZWMxZjEyOTA0N2RhMmQzZGI3OWU5OTdlMzkzMTRiOTUzNTc2N2RkNiJ9.gREfE2nsYv6UTWgi9GbNK49DwlfRnTfgTHl3hf1ye3c
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC92MVwvZWRpdFVzZXJCeVRva2VuIiwiaWF0IjoxNjE4NTQ5MTU4LCJleHAiOjE2MTg1NTI3NTgsIm5iZiI6MTYxODU0OTE1OCwianRpIjoiQVVjSjBsVUlXSzZVcXpRVSIsInN1YiI6MSwicHJ2IjoiZWMxZjEyOTA0N2RhMmQzZGI3OWU5OTdlMzkzMTRiOTUzNTc2N2RkNiJ9.gREfE2nsYv6UTWgi9GbNK49DwlfRnTfgTHl3hf1ye3c"
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC92MVwvZWRpdFVzZXJCeVRva2VuIiwiaWF0IjoxNjE4NTM0Nzc0LCJleHAiOjE2MTg1MzgzNzQsIm5iZiI6MTYxODUzNDc3NCwianRpIjoiWmszbFc4QjRiWkd4Z2NtUiIsInN1YiI6MSwicHJ2IjoiZWMxZjEyOTA0N2RhMmQzZGI3OWU5OTdlMzkzMTRiOTUzNTc2N2RkNiJ9.8LMvfW1XjZ61yDis5iRIVq5tX8Jqiug2-acABPBOcf0"
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJod…kNiJ9.8LMvfW1XjZ61yDis5iRIVq5tX8Jqiug2-acABPBOcf0
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC92MVwvZWRpdFVzZXJCeVRva2VuIiwiaWF0IjoxNjE4NTM4MTA0LCJleHAiOjE2MTg1NDE3MDQsIm5iZiI6MTYxODUzODEwNCwianRpIjoiRDJ1YTlVYjdUd3U2eVdkQyIsInN1YiI6MSwicHJ2IjoiZWMxZjEyOTA0N2RhMmQzZGI3OWU5OTdlMzkzMTRiOTUzNTc2N2RkNiJ9.i5uW9pOIQPBO3Ab5r8wA1wG6gD459VIDisvRelyj5jM"
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC92MVwvZWRpdFVzZXJCeVRva2VuIiwiaWF0IjoxNjE4NTM4MTA0LCJleHAiOjE2MTg1NDE3MDQsIm5iZiI6MTYxODUzODEwNCwianRpIjoiRDJ1YTlVYjdUd3U2eVdkQyIsInN1YiI6MSwicHJ2IjoiZWMxZjEyOTA0N2RhMmQzZGI3OWU5OTdlMzkzMTRiOTUzNTc2N2RkNiJ9.i5uW9pOIQPBO3Ab5r8wA1wG6gD459VIDisvRelyj5jM
    searchListQuans(search: string): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/searchListQuans?search=" + search, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

    checkTokenUser(): Observable<any>{
        console.log(this.appCommonService.getToken());
        console.log(this.appCommonService.httpOptions);
        
        return this.http.get<any>(environment.url + '/api/v1/checkTokenUser',this.appCommonService.httpOptions).pipe(
            tap(data => {
                console.log(data);
                console.log(this.appCommonService.getToken());
                
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    login(user : User): Observable<any>{
        return this.http.post<any>(environment.url + '/api/v1/login', user, this.appCommonService.httpOptions).pipe(
            tap(data=>{
                console.log(data);
                if(data.status){
                    this.appCommonService.setToken(data.user.token);   
                }
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    Register(user: User1): Observable<any> {
       console.log(user);
       return this.http.post<any>(environment.url + '/api/v1/register', user).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    
    checkTokenAdmin(): Observable<any> {
        return this.http.get<any>('http://localhost:8000/api/v1/checkTokenAdmin', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    checkTokenInnkeeper(): Observable<any> {
        return this.http.get<any>(environment.url + '/api/v1/checkTokenInnkeeper', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    checkTokenInnkeeperAndIdquan(idquan: number): Observable<any> {
        return this.http.post<any>(environment.url + '/api/v1/checkTokenInnkeeperAndIdquan', { "idquan": idquan }, this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

}
