import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from "../../services/admin.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { Chart, ChartOptions, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { environment } from './../../../../environments/environment';

@Component({
    selector: 'sb-danh-thu-of-quan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './danh-thu-of-quan.component.html',
    styleUrls: ['danh-thu-of-quan.component.scss'],
})
export class DanhThuOfQuanComponent implements OnInit {
    thang = new Date().toISOString().slice(0, 7);
    year = Number(new Date().toISOString().slice(0, 4));
    idquan = 0;
    url = environment.url;
    checkdoanhthus = false;
    doanhthus: any;
    lineChartOptionsBD = {
        responsive: true,
    };
    lineChartColorsBD: Color[] = [
        {
            backgroundColor: [
                'rgba(0,255,0,0.3)',//xanh lá cây
                'rgba(255,0,0,0.3)', //đỏ
                'rgba(0,0,255,0.3)',//blue
                'rgba(192,192,192,0.3)',//grey
                'rgba(255,255,0,0.3)',//yellow
                'rgba(255,0,255,0.3)',// Cerise
                'rgba(0,255,0,0.3)',//xanh lá cây
                'rgba(255,0,0,0.3)', //đỏ
                'rgba(0,0,255,0.3)',//blue
                'rgba(192,192,192,0.3)',//grey
                'rgba(255,255,0,0.3)',//yellow
                'rgba(255,0,255,0.3)',// Cerise
            ]
        },

    ];
    pieChartOptionsBD: ChartOptions = {
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    min: 0,
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                }
            }]
        }
    };
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    doanhthustheonam = [];
    lineChartTypeBD = 'bar';//'pie';//'line';
    lineChartDataBD: ChartDataSets[] = [];
    lineChartLabelsBD = [
        'tháng 1',
        'tháng 2',
        'tháng 3',
        'tháng 4',
        'tháng 5',
        'tháng 6',
        'tháng 7',
        'tháng 8',
        'tháng 9',
        'tháng 10',
        'tháng 11',
        'tháng 12',

    ];
    pieChartPlugins = [];
    checkquan = false;
    quan: any;
    checkdoanhthustheonam = false;
    constructor(
        private dashboardService: AdminService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.idquan);
        this.getDoanhThuByAdmin();
        this.getTongDoanhCuaMotQuanThuTheoNamByAdmin(this.idquan, this.year);
    }
    tongdoanhthu="";
    getDoanhThuByAdmin() {
        this.dashboardService.getDoanhThuByAdmin(this.idquan, this.thang).subscribe(data => {
            console.log(data);

            if (data.status) {
                this.doanhthus = data.doanhthus;
                let tongdoanhthu=0;
                for (let i = 0; i < this.doanhthus.length; i++) {
                    tongdoanhthu+=this.doanhthus[i].doanhthu;
                    this.doanhthus[i].doanhthu = this.doanhthus[i].doanhthu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                this.tongdoanhthu = tongdoanhthu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.quan = data.quan;
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                this.checkquan = true;
                this.checkdoanhthus = true;
                this.changeDetectorRef.detectChanges();

            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                });

            }
        })
    }
    tinhtongDanhthucuuanam(mang: any) {
        console.log(mang);

        let tong = 0;
        for (let i = 0; i < mang.length; i++) {
            tong += mang[i];

        }
        return tong;
    }
    tongDanhthucuuanam = "";
    getTongDoanhCuaMotQuanThuTheoNamByAdmin(idquan: number, nam: number,) {
        this.checkdoanhthustheonam = false;
        this.dashboardService.getTongDoanhCuaMotQuanThuTheoNamByAdmin(idquan, nam).subscribe(
            data => {
                if (data.status) {
                    this.doanhthustheonam = data.doanhthustheonam;
                    this.lineChartDataBD = [{ data: data.doanhthustheonam, label: 'Doanh thu theo năm' }];
                    this.tongDanhthucuuanam = this.tinhtongDanhthucuuanam(this.doanhthustheonam).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.checkdoanhthustheonam = true;
                    this.changeDetectorRef.detectChanges();
                }

            }
        )
    }
    mangreviewquan: any;
    reviewquan = 0;

    taomotmangreview(review: number) {
        switch (review) {
            case 0: return [false, false, false, false, false];
            case 1: return [true, false, false, false, false];
            case 2: return [true, true, false, false, false];
            case 3: return [true, true, true, false, false];
            case 4: return [true, true, true, true, false];
            case 5: return [true, true, true, true, true];
            default:
                break;
        }
    }

    tinhTongDanhThu(doanhthus: any) {
        let tong = 0;
        for (let i = 0; i < doanhthus.length; i++) {
            tong += doanhthus[i].doanhthu;

        }
        return tong;
    }
    checkchitiet = true;
    chitietdanhthu(id: number) {
        this.checkchitiet = false;
        this.getChiTietDanhthuCuaMotQuanByAdmin(id);

    }
    OK() {
        this.checkchitiet = true;
    }
    chonthang() {
        this.getDoanhThuByAdmin();

    }
    break() {
        this.router.navigate(['dashboard/quans/' + this.idquan])
    }
    chonNam() {
        console.log(this.year);

    }
    //'bar';//'pie';//'line';
    dangBD = "Biểu đồ cột";
    cot() {
        this.dangBD = "Biểu đồ cột";
        this.lineChartTypeBD = "bar"
    }
    tron() {
        this.dangBD = "Biểu đồ hình tròn";
        this.lineChartTypeBD = "pie";
    }
    duong() {
        this.dangBD = "Biểu đồ đường";
        this.lineChartTypeBD = "line";
    }
    tongdoanhthuchitiet="";
    getChiTietDanhthuCuaMotQuanByAdmin(id: number) {
        this.checkdatsans = false;
        this.dashboardService.getChiTietDanhthuCuaMotQuanByAdmin(id).subscribe(data => {
            
            if (data.status) {
                this.datsans = data.mangChitietDoanhthus;
                this.taodatsansnew(this.page);
                let tong = 0;
                for (let i = 0; i < this.datsans.length; i++) {
                    tong+=this.datsans[i].price;
                    this.datsans[i].price = this.datsans[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                console.log(tong);
                
                this.tongdoanhthuchitiet = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.checkdatsans = true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }

    checkdatsans = false;
    datsans: any;

    datsansnew: any;
    page = 1;
    tongpage = 0;
    mangtrang: any;
    taodatsansnew(page: number) {
        this.datsansnew = [];
        this.tongpage = this.datsans.length / 10;
        let i = (page - 1) * 10;
        let k;
        if (page < this.tongpage) {
            k = 10;
        } else {
            k = this.datsans.length % 10;
        }
        for (let j = 0; j < k; j++) {
            if (j == 10) {
                break;
            }
            this.datsansnew.push(this.datsans[i + j]);

        }
        this.taomangtrang(page);
    }
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
            this.taodatsansnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taodatsansnew(this.page);
        }
    }
    chontrang(page: number) {
        console.log(page);

        this.page = page;
        this.taodatsansnew(this.page);
    }


}
