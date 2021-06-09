import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from "../../services/admin.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { Chart, ChartOptions, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
    selector: 'sb-doanh-thu-cua-admin-theo-nam',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './doanh-thu-cua-admin-theo-nam.component.html',
    styleUrls: ['doanh-thu-cua-admin-theo-nam.component.scss'],
})
export class DoanhThuCuaAdminTheoNamComponent implements OnInit {
    nam = Number(new Date().toISOString().slice(0, 4));
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
    checkdoanhthustheonam = false;
    constructor(
        private dashboardService: AdminService,
        private router: Router,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }
    ngOnInit() {
        this.getDoanhThuCuaAdminTheoNam(this.nam);
        this.getDoanhThuListQuanCuaMotNamByAdmin(this.nam);
    }
    checkdoanhthusListQuanCuaMotNam=false;
    doanhthusListQuanCuaMotNam: any;
    tongdoanhthuquan = "";
    tongdoanhthuadmin = "";
    laixuat = "";
    getDoanhThuListQuanCuaMotNamByAdmin(nam: number){
        this.checkdoanhthusListQuanCuaMotNam=false;
        this.dashboardService.getDoanhThuListQuanCuaMotNamByAdmin(nam).subscribe(data =>{
            if(data.status){
                this.doanhthusListQuanCuaMotNam=data.doanhthus;
                let tongdoanhthuquan = 0;
                let tongdoanhthuadmin = 0;
                for (let i = 0; i < this.doanhthusListQuanCuaMotNam.length; i++) {
                    tongdoanhthuquan += this.doanhthusListQuanCuaMotNam[i].doanhthuquan;
                    this.doanhthusListQuanCuaMotNam[i].doanhthuquan = this.doanhthusListQuanCuaMotNam[i].doanhthuquan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    tongdoanhthuadmin += this.doanhthusListQuanCuaMotNam[i].doanhthuadmin;
                    this.doanhthusListQuanCuaMotNam[i].doanhthuadmin = this.doanhthusListQuanCuaMotNam[i].doanhthuadmin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                this.tongdoanhthuquan = tongdoanhthuquan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.tongdoanhthuadmin = tongdoanhthuadmin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.laixuat = data.laixuat;
                this.checkdoanhthusListQuanCuaMotNam= true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }
    chonNam(){
        this.getDoanhThuCuaAdminTheoNam(this.nam);
        this.getDoanhThuListQuanCuaMotNamByAdmin(this.nam);
    }
    tinhtongDoanhthucuuanam(mang: any) {
        let tong = 0;
        for (let i = 0; i < mang.length; i++) {
            tong += mang[i];
        }
        return tong;
    }
    tongDanhthucuuanam = "";
    getDoanhThuCuaAdminTheoNam( nam: number) {
        this.checkdoanhthustheonam = false;
        this.dashboardService.getDoanhThuCuaAdminTheoNam(nam).subscribe(
            data => {
                if (data.status) {
                    this.doanhthustheonam = data.doanhthustheonam;
                    this.lineChartDataBD = [{ data: data.doanhthustheonam, label: 'Doanh thu theo năm' }];
                    this.tongDanhthucuuanam = this.tinhtongDoanhthucuuanam(this.doanhthustheonam).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.checkdoanhthustheonam = true;
                    this.changeDetectorRef.detectChanges();
                }

            }
        )
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


}
