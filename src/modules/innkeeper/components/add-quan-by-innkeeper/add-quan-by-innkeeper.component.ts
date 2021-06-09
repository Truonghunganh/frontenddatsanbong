import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import {InnkeeperService } from "../../services/innkeeper.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-add-quan-by-innkeeper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-quan-by-innkeeper.component.html',
    styleUrls: ['add-quan-by-innkeeper.component.scss'],
})
export class AddQuanByInnkeeperComponent implements OnInit {
    @ViewChild('myPond') myPond: any;
    pondOptions = {
        class: 'my-filepond',
        multiple: true,
        labelIdle: 'Chọn hình ở đây',
        acceptedFileTypes: 'image/jpeg, image/png',
    };
    file:any;
    pondHandleAddFile(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        } else {
            Swal.fire('please , you select the image again');
        }
    }
    pondHandleInit() { }


    constructor(private dashboardService: InnkeeperService,
        private authService: AuthService,
         private router: Router) {
    }
   
    ngOnInit() {
    }
    Add(name: string, address: string, linkaddress: string, vido: string, kinhdo: string){
        const formData = new FormData();
        formData.append('image', this.file,this.file.name);
        formData.append('name', name);
        formData.append('address', address);
        formData.append('linkaddress', linkaddress);
        formData.append('vido', vido);
        formData.append('kinhdo', kinhdo);
        this.dashboardService.addQuanByInnkeeper(formData).subscribe(data=>{
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Bạn đã thêm quán thành công',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(['/innkeeper/quans'])
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        })
        
    }
    
    Cancel(){
        this.router.navigate(['/innkeeper/quans'])

    }
}
