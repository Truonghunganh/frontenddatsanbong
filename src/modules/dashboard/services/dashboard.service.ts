import { Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Datsan,User } from '../models/dashboard.model'; 
import { AuthService  } from '../../auth/services/auth.service'

@Injectable()
export class DashboardService {
    constructor(
        private http: HttpClient, 
        private appCommonService: AppCommonService,
        private authService: AuthService
        ) {}

    getListQuansChoUser(): Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/quan",this.appCommonService.httpOptions)
            .pipe(tap(data => {of(data);},
                catchError(this.appCommonService.errorHandler)
                ));
    }
    // getAllQuanDangHoatdongByUser(): Observable<any>{
    //     return this.http.get<any>(environment.url + "/api/v1/getAllQuanDangHoatdongByUser",this.appCommonService.httpOptions).
    //         pipe(tap(data =>of(data)), catchError(this.appCommonService.errorHandler))
    // }
    getQuanByIdAndTokenUser(id: number): Observable<any>{
        return this.http.post<any>(environment.url + "/api/v1/getQuanByIdAndTokenUser",{"idquan":id},this.appCommonService.httpOptions)
                .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    
    getDatSansvaSansByUserAndIdquanAndNgay(idquan:number,ngay:any): Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/getDatSansvaSansByUserAndIdquanAndNgay?idquan=" + idquan + "&start_time="+ngay,this.appCommonService.httpOptions)
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }
    
    addDatSan(datsan: Datsan): Observable<any> {
        console.log(datsan);
        return this.http
            .post<any>(environment.url + "/api/v1/datsans", datsan, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    
    getListDatSanByUserToken(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListDatSanByUserToken",this.appCommonService.httpOptions).pipe(
            tap(data => of(data)),catchError(this.appCommonService.errorHandler)
        );
    }
    getListQuansByTrangthaiChoHome(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansByTrangthaiChoHome")
            .pipe(tap(data => { of(data); },
                catchError(this.appCommonService.errorHandler)
            ));
    }

    editUserByToken(user: User): Observable<any>{
        return this.http.put<any>(environment.url + "/api/v1/editUserByToken",user,this.appCommonService.httpOptions).pipe(
            tap(data => { 
                console.log(data);
                if (data.status) {
                    this.appCommonService.setToken(data.token);
                    console.log(data.token);
                    console.log(this.appCommonService.getToken());
                    
                }
                of(data)} )
            ,catchError(this.appCommonService.errorHandler)
        )
    }
    reviewByUser(idquan: number,review: number): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/reviewByUser",{"idquan": idquan, "review": review}, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

    deleteDatSan(id:number): Observable<any> {
        return this.http.delete<any>(environment.url + "/api/v1/datsans/"+id,  this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data)
            })
            , catchError(this.appCommonService.errorHandler)
        )
    }
    getAllCommentCuaMotQuan(idquan: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/comments?idquan="+idquan, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    addComment(idquan: number,binhluan:string): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/comments",{"idquan":idquan, "binhluan":binhluan}, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    updateComment(id: number, binhluan: string): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/comments/"+id, { "binhluan": binhluan }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    xoaComment(id: number): Observable<any> {
        return this.http.delete<any>(environment.url + "/api/v1/comments/" + id, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

    searchListQuans( search: string): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/searchListQuans?search="+ search, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }


}
