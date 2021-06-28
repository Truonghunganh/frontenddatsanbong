import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AppCommonService {
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
       
    }
    public httpOptions = {
        headers: new HttpHeaders({
            'token': JSON.parse(this.getToken()),
        }),
    };
    public tokenSai=false;
    setTokenSai(tokenSai:boolean){
        this.tokenSai=tokenSai;
    }
    // public token = false;
    // public tokenUser = false;

    resetHttpOptions(){
        this.httpOptions = {
            headers: new HttpHeaders({
                'token': JSON.parse(this.getToken()),
            })
        };

    }
    getToken(){
        return this.storage.get('token');
    }
    logout(){
        this.storage.remove("token");
        
    }
    setToken(token: any) {
        this.storage.set('token', JSON.stringify(token));
        
        this.httpOptions ={
            headers: new HttpHeaders({
                'token': JSON.parse(JSON.stringify(token)),
            })
        };
        return this.httpOptions;
    }
    getAppCommon$(): Observable<{}> {
        return of({});
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Serve error');
    }
}
