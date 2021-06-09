import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Innkeeper, Quan, Thaydoidatsan, San, San1} from '../models/innkeeper.model';
import { AuthService } from '../../auth/services/auth.service'

@Injectable()
export class InnkeeperService {
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        private authService: AuthService
    ) { }


    getListQuansByTokenInnkeeper(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansByTokenInnkeeper", this.appCommonService.httpOptions)
            .pipe(tap(data => { of(data); },
                catchError(this.appCommonService.errorHandler)
            ));
    }

    editInnkeeperByToken(innkeeper: Innkeeper): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/editInnkeeperByToken", innkeeper, this.appCommonService.httpOptions).pipe(
            tap(data => {
                console.log(data);
                if (data.status) {
                    this.appCommonService.setToken(data.token);
                }

                of(data)
            })
            , catchError(this.appCommonService.errorHandler)
        )
    }

    addQuanByInnkeeper(formData: FormData): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/addQuanByInnkeeper", formData, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            )
    }

    getListQuansByTokenInnkeeperChuaPheDuyet(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansByTokenInnkeeperChuaPheDuyet", this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }

    getQuanByInnkeeper(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/quan/" + id, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }

    editQuanByTokenInnkeeper(formData: FormData): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/editQuanByTokenInnkeeper", formData, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

    getDatSansvaSansByInnkeeperAndIdquanAndNgay(idquan: number, ngay: any): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDatSansvaSansByInnkeeperAndIdquanAndNgay", { "idquan": idquan, "start_time": ngay }, this.appCommonService.httpOptions)
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }


    getQuanByIdAndTokenInnkeeper(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getQuanByIdAndTokenInnkeeper?idquan=" + id, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    addSanByInnkeeper(san: San): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/addSanByInnkeeper", san, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    deleteQuanChuaduyetByInnkeeper(idquan: number): Observable<any> {
        return this.http.delete<any>(environment.url + "/api/v1/deleteQuanChuaduyetByInnkeeper?idquan=" + idquan, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    getSanByInnkeeperVaId(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getSanByInnkeeperVaId?idsan=" + id, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    editSanByInnkeeper(san: San1): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/editSanByInnkeeper", san, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    getDoanhThuByInnkeeper(idquan: number, month: any): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDoanhThuByInnkeeper", { "idquan": idquan, "time": month }, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    getListDatSanByInnkeeper(start_time: string): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getListDatSanByInnkeeper", { "start_time": start_time }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    thayDoiDatSanByInnkeeper(thaydoidatsan: Thaydoidatsan): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/thayDoiDatSanByInnkeeper", thaydoidatsan, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }

    getAllDatSanByInnkeeperAndIdquan(idquan: number, trangthai: boolean, time: string): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getAllDatSanByInnkeeperAndIdquan", { "idquan": idquan, "trangthai": trangthai, "time": time }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }

    xacNhanDatsanByInnkeeper(iddatsan: number): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/xacNhanDatsanByInnkeeper", { "iddatsan": iddatsan }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }

    getTongDoanhThuTheoNamByInnkeeper(idquan: number, nam: number): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getTongDoanhThuTheoNamByInnkeeper", { "idquan": idquan, "nam": nam }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    getChiTietDanhthuByInnkeeper(id: number): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getChiTietDanhthuByInnkeeper", { "id": id }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        )
    }
    thayDoiTrangthaiSanByInnkeeper(idsan: number, trangthai: boolean): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/thayDoiTrangthaiSanByInnkeeper", { "idsan": idsan, "trangthai": trangthai }, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler))
    }
    getAllCommentCuaMotQuanByInnkeeper(idquan: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getAllCommentCuaMotQuanByInnkeeper?idquan=" + idquan, this.appCommonService.httpOptions).
            pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    getInnkeeper$(): Observable<{}> {
        return of({});
    }

}
