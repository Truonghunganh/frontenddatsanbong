import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Datsan, Admin, User } from '../models/admin.model';
import { AuthService } from '../../auth/services/auth.service'

@Injectable()
export class AdminService {

    getAdmin$(): Observable<{}> {
        return of({});
    }
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        private authService: AuthService
    ) { }

    getDashboard$(): Observable<{}> {
        return of({});
    }
    getListDatSanByUserToken(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListDatSanByUserToken", this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    getListQuansDaPheDuyetByTokenAdmin(page: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansDaPheDuyetByTokenAdmin?page=" + page, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    getListQuansChuaPheDuyetByTokenAdmin(page: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansChuaPheDuyetByTokenAdmin?page=" + page, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    UpdateTrangThaiQuanTokenAdmin(idquan: number, trangthai: boolean): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/UpdateTrangThaiQuanTokenAdmin", { "idquan": idquan, "trangthai": trangthai }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

    deleteQuanByAdmin(id: number): Observable<any> {
        return this.http.delete<any>(environment.url + "/api/v1/quan/" + id, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    editAdminByToken(admin: Admin): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/editAdminByToken", admin, this.appCommonService.httpOptions).pipe(
            tap(data => {
                if (data.status) {
                    this.appCommonService.setToken(data.token);
                }
                of(data)
            }), catchError(this.appCommonService.errorHandler)
        );
    }
    getDatSansvaSansByAdminAndIdquanAndNgay(idquan: number, ngay: any): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDatSansvaSansByAdminAndIdquanAndNgay", { "idquan": idquan, "start_time": ngay }, this.appCommonService.httpOptions)
            .pipe(tap(data => { of(data); }, catchError(this.appCommonService.errorHandler)));
    }


    getQuanById(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/quan/" + id, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    getDoanhThuByAdmin(idquan: number, month: any): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDoanhThuByAdmin", { "idquan": idquan, "time": month }, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    getDoanhThuListQuanByAdmin(month: any): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDoanhThuListQuanByAdmin", { "time": month }, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    getDoanhThuCuaAdminTheoNam(nam: number): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDoanhThuCuaAdminTheoNam", { "nam": nam }, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    getAllQuansByTokenAdmin(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getAllQuansByTokenAdmin", this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    getTongDoanhCuaMotQuanThuTheoNamByAdmin(idquan: number, nam: number): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getTongDoanhCuaMotQuanThuTheoNamByAdmin", { "idquan": idquan, "nam": nam }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    getChiTietDanhthuCuaMotQuanByAdmin(id: number): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getChiTietDanhthuCuaMotQuanByAdmin", { "id": id }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    getDoanhThuListQuanCuaMotNamByAdmin(nam: number): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDoanhThuListQuanCuaMotNamByAdmin", { "nam": nam }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    getAllCommentCuaMotQuanByAdmin(idquan: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getAllCommentCuaMotQuanByAdmin?idquan=" + idquan, this.appCommonService.httpOptions).
            pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    getUsersByAdmin(user:string,page:number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/users?page=" + page+"&&user="+ user , this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }

    editUserByAdmin(user: User): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/editUserByAdmin", user, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    searchUsersByAdmin(role: string, search: string): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/searchUsersByAdmin?role="+role+"&&search="+search, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }

}
