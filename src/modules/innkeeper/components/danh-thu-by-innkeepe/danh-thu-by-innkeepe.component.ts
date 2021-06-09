import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InnkeeperService } from "../../services/innkeeper.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { Chart, ChartOptions, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { environment } from './../../../../environments/environment';

@Component({
    selector: 'sb-danh-thu-by-innkeepe',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './danh-thu-by-innkeepe.component.html',
    styleUrls: ['danh-thu-by-innkeepe.component.scss'],
})
export class DanhThuByInnkeepeComponent implements OnInit {
    thang = new Date().toISOString().slice(0, 7);
    year=Number( new Date().toISOString().slice(0,4));
    idquan=0;
    url = environment.url;
    checkdoanhthus=false;
    doanhthus:any;
    tongDanhthu="";
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
    doanhthustheonam =[];
    lineChartTypeBD = 'bar';//'pie';//'line';
    lineChartDataBD: ChartDataSets[] =[];
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
    checkquan=false;
    quan:any;
    checkdoanhthustheonam=false;
    constructor(
        private dashboardService: InnkeeperService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
        ) {}
    ngOnInit() {
        this.idquan=Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.year);
        
        this.checkTokenInnkeeperAndIdquan(this.idquan);
    }
    checkTokenInnkeeperAndIdquan(idquan: number) {
        this.checkquan= false;
        this.authService.checkTokenInnkeeperAndIdquan(idquan).subscribe(data => {
            if (!data.status) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
                this.router.navigate(['/innkeeper/quans'])
                
            }  else {
                this.quan=data.quan;
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                this.checkquan=true;
                this.getDanhThuByInnkeeper();
                this.getTongDoanhThuTheoNamByInnkeeper(this.idquan, this.year);

            }
        })
    }
    tinhtongDanhthucuuanam (mang: any){
        console.log(mang);
        
        let tong=0;
        for (let i = 0; i < mang.length; i++) {
            tong+=mang[i];
            
        }
        return tong;
    }
    tongDanhthucuuanam ="";
    getTongDoanhThuTheoNamByInnkeeper(idquan: number, nam: number,) {
        this.checkdoanhthustheonam=false;
        this.dashboardService.getTongDoanhThuTheoNamByInnkeeper(idquan, nam).subscribe(
            data => {
                if(data.status){
                    this.doanhthustheonam = data.doanhthustheonam;
                    this.lineChartDataBD = [{ data: data.doanhthustheonam, label: 'Doanh thu theo năm' }];
                    this.tongDanhthucuuanam = this.tinhtongDanhthucuuanam(this.doanhthustheonam).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.checkdoanhthustheonam = true;
                    this.changeDetectorRef.detectChanges();
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: data.message,
                    })
                    this.router.navigate(['/innkeeper/quans'])

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

    tinhTongDanhThu(doanhthus: any){
        let tong=0;
        for (let i = 0; i < doanhthus.length; i++) {
            tong+=doanhthus[i].doanhthu;
            
        }
        return tong;
    }
    getDanhThuByInnkeeper(){
        this.checkdoanhthus= false;
        this.dashboardService.getDoanhThuByInnkeeper(this.idquan,this.thang).subscribe(data => {
            console.log(data);
            
            if (data.status) {
                this.doanhthus=data.doanhthus;
                this.tongDanhthu = this.tinhTongDanhThu(this.doanhthus).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                console.log(this.tongDanhthu);
                for (let i = 0; i < this.doanhthus.length; i++) {
                    this.doanhthus[i].doanhthu = this.doanhthus[i].doanhthu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                this.checkdoanhthus=true;
                this.changeDetectorRef.detectChanges();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
      
            }
        })
    }
    checkchitiet=true;
    chitietdanhthu(id: number){
        this.checkchitiet=false;
        this.getChiTietDanhthuByInnkeeper(id);

    }
    OK() {
        this.checkchitiet=true;
    }
    chonthang() {
        this.getDanhThuByInnkeeper();
       
    }
    break(){
        this.router.navigate(['dashboard/quans/'+this.idquan])
    }
    chonNam(){
        console.log(this.year);
        
    }
    //'bar';//'pie';//'line';
        dangBD="Biểu đồ cột";
    cot(){
        this.dangBD = "Biểu đồ cột";
        this.lineChartTypeBD="bar"
    }
    tron(){
        this.dangBD = "Biểu đồ hình tròn";
        this.lineChartTypeBD="pie";
    }
    duong(){
        this.dangBD="Biểu đồ đường";
        this.lineChartTypeBD="line";
    }
    tongchitietdatsan="";
    getChiTietDanhthuByInnkeeper(id: number) {
        this.checkdatsans = false;
        this.dashboardService.getChiTietDanhthuByInnkeeper(id).subscribe(data => {
            if (data.status) {
                this.datsans = data.mangChitietDoanhthus;
                let tongchitietdatsan=0;
                for (let i = 0; i < this.datsans.length; i++) {
                    tongchitietdatsan += parseInt(this.datsans[i].price);
                    this.datsans[i].price = this.datsans[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                this.tongchitietdatsan=tongchitietdatsan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.taodatsansnew(this.page);
                this.checkdatsans = true;
                this.changeDetectorRef.detectChanges();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

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
