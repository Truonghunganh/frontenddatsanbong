import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InnkeeperService } from "../../services/innkeeper.service";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { AppCommonService } from '@common/services';


@Component({
    selector: 'sb-thong-tin-dat-sans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './thong-tin-dat-sans.component.html',
    styleUrls: ['thong-tin-dat-sans.component.scss'],
})
export class ThongTinDatSansComponent implements OnInit {
    trangthai=false;
    time = new Date().toISOString().slice(0, 10);
    idquan=0;
    datsans: any;
    checkdatsans=false;


    constructor(
        private dashboardService: InnkeeperService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
        private appCommonService: AppCommonService,
    ) { }
    ngOnInit() {
        if (this.appCommonService.getToken()) {
            this.time = new Date().toISOString().slice(0, 10) + " 00:00:00";
            this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'))
            this.checktoken(this.idquan);
        }
    }
    checktoken(idquan: number) {
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            if (!data.status) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
                this.router.navigate(['/innkeeper/quans'])
            } else {
                this.page=1;
                this.getAllDatSanByInnkeeperAndIdquan(this.idquan,this.trangthai,this.time,this.page);
            }
        })
    }
    
    getAllDatSanByInnkeeperAndIdquan(idquan: number,trangthai:boolean,time:string,page:number){
        this.checkdatsans=false;
        this.dashboardService.getAllDatSanByInnkeeperAndIdquan(idquan, trangthai, time, page).subscribe(data=>{
            if(data.status){
                this.datsans=data.datsans;
                this.tongpage = data.tongpage;
                this.taomangtrang(this.page);
                this.checkdatsans=true;
                this.changeDetectorRef.detectChanges();
            }  
        })
    }

    datsansnew:any;
    page = 1;
    tongpage = 0;
    mangtrang: any;
    taomangtrang(page: number) {
        var mang: Array<boolean> = [];
        for (let i = 0; i < this.tongpage; i++) {
            mang.push(false);

        }
        mang[page - 1] = true;
        this.mangtrang = mang;

    }
    Previous() {
        if (this.page > 1) {
            this.page--;
            this.getAllDatSanByInnkeeperAndIdquan(this.idquan, this.trangthai, this.time, this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.getAllDatSanByInnkeeperAndIdquan(this.idquan, this.trangthai, this.time, this.page);
        }
    }
    chontrang(page: number) {
        this.page = page;
        this.getAllDatSanByInnkeeperAndIdquan(this.idquan, this.trangthai, this.time, this.page);
    }

    xacnhan(iddatsan: number,xacnhan:boolean){
        this.dashboardService.xacNhanDatsanByInnkeeper(iddatsan,xacnhan).subscribe(data=>{
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.getAllDatSanByInnkeeperAndIdquan(this.idquan, this.trangthai, this.time,this.page);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        })
        
    }
    deleteDatSan(datsan:any){
        Swal.fire({
            html: '<h1 style="color: #41c04d;">B???n c?? mu???n x??a kh??ng ?</h1><table style="width: 100%;" border="1"><tr><td>T??n kh??ch h??ng </td><td>' +
                datsan.user.name + '</td></tr><tr><td>S??? ??i???n tho???i kh??ch h??ng </td><td>' +
                datsan.user.phone + '</td></tr><tr><td>T??n s??n </td><td>' +
                datsan.san.name + '</td></tr><tr><td>S??? ng?????i </td><td>' +
                datsan.san.numberpeople + '</td></tr><tr><td>S??? ti???n thanh to??n</td><td>' +
                datsan.san.priceperhour + '</td></tr><tr><td>Gi??? ?????t s??n</td><td>' + datsan.start_time +
                '</td></tr></table>',
            confirmButtonText: `X??a ?????t s??n`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.deleteDatsanByInnkeeper(datsan.id).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'X??a th??nh c??ng',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.page=1;
                        this.getAllDatSanByInnkeeperAndIdquan(this.idquan, this.trangthai, this.time,this.page);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })
                    }
                });
            }
        });
    }
    ChangeStatus(){
        this.trangthai=!this.trangthai;
        this.page=1;
        this.getAllDatSanByInnkeeperAndIdquan(this.idquan,this.trangthai,this.time,this.page);
    }
}

