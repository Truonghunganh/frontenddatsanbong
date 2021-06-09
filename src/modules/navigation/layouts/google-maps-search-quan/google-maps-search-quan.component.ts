import { ChangeDetectionStrategy, Input, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from './../../../../environments/environment';
declare const L: any;

@Component({
    selector: 'sb-google-maps-search-quan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './google-maps-search-quan.component.html',
    styleUrls: ['google-maps-search-quan.component.scss'],
})
export class GoogleMapsSearchQuanComponent implements OnInit , OnDestroy{
    constructor(
        private changeDetectorRef: ChangeDetectorRef

        ) {}
    subscription: Subscription = new Subscription();
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        console.log(this.user);
        
        console.log(this.listquans);
        this.hienVitricacquan(this.listquans);
        
       // this.getListquans();
        //this.checktoken()
        
    }
    url= environment.url+"/api/v1/";
    @Input() listquans: any;
    @Input() hienthivitricuaminh: boolean=true;
    @Input() user: string="dashboard";

    hienVitricacquan(quans:any){
        if (!navigator.geolocation) {
            console.log('location is not supported');
        }
        console.log(quans);
        
        navigator.geolocation.getCurrentPosition((position) => {
            const  coords = position.coords;
            let latLong = [coords.latitude, coords.longitude];
            if (!this.hienthivitricuaminh&&quans.length>0) {
                let i = quans.length - 1;
                latLong = [quans[i].vido, quans[i].kinhdo];
            }
            let mymap = L.map('map').setView(latLong, 13);
            latLong = [coords.latitude, coords.longitude];
            console.log(
                `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
            );
        
       
            L.tileLayer(
                'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
                {
                    attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'your.mapbox.access.token',
                }
            ).addTo(mymap);

            var myIcon = L.icon({
                iconUrl: '../../../assets/img/vitri.jpg',//'../../../assets/img/vitri.jpg',
                iconSize: [25, 41],
                
            });
            if (!this.hienthivitricuaminh) {
                L.circleMarker(latLong, { color: '#FF0000' }).addTo(mymap).bindPopup('<strong>tôi đang ở đây </strong>');
                for (let i = 0; i < quans.length; i++) {
                    L.marker([quans[i].vido, quans[i].kinhdo]).addTo(mymap).bindPopup(
                        '<table  class="table"><tbody>' +
                        '<tr><td> Tên  :</td><td>' + quans[i].name + '</td></tr>' +
                        '<tr><td> địa chỉ :</td><td>' + quans[i].address + '</td></tr>' +
                        '<tr><td> số điện thoại :</td><td>' + quans[i].phone + '</td></tr>' +
                        '</tbody></table>' +
                        '<a href="/' + this.user+'/quans/' + quans[i].id + '">chọn sân này</a>'
                    );
                }
  
            }
            if (this.hienthivitricuaminh) {
                for (let i = 0; i < quans.length; i++) {
                    L.marker([quans[i].vido, quans[i].kinhdo], { center: [quans[i].vido, quans[i].kinhdo] }).addTo(mymap).bindPopup(
                        '<table class="table"><tbody>' +
                        '<tr><td> Tên  :</td><td>' + quans[i].name + '</td></tr>' +
                        '<tr><td> địa chỉ :</td><td>' + quans[i].address + '</td></tr>' +
                        '<tr><td> số điện thoại :</td><td>' + quans[i].phone + '</td></tr>' +
                        '</tbody></table>' +
                        '<a href="/'+this.user+'/quans/' + quans[i].id + '">chọn sân này</a>'
                    );
                }
                L.circleMarker(latLong, { color: '#FF0000', center: [coords.latitude, coords.longitude] }).addTo(mymap).bindPopup('<strong>tôi đang ở đây </strong>');
            }
            this.changeDetectorRef.detectChanges();

        });
    }
}
/**
 * L.circle(latLong,200) : hình tròn có đường kính 200m
 */