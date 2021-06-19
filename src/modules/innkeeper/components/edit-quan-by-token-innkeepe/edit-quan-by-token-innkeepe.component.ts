import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { InnkeeperService } from "../../services/innkeeper.service";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service'

@Component({
    selector: 'sb-edit-quan-by-token-innkeepe',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-quan-by-token-innkeepe.component.html',
    styleUrls: ['edit-quan-by-token-innkeepe.component.scss'],
})
export class EditQuanByTokenInnkeepeComponent implements OnInit {
    @ViewChild('myPond') myPond: any;
    pondOptions = {
        class: 'my-filepond',
        multiple: true,
        labelIdle: 'Chọn hình ở đây',
        acceptedFileTypes: 'image/jpeg, image/png',
    };
    file: any;
    pondHandleAddFile(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        } else {
            Swal.fire('please , you select the image again');
        }
    }
    pondHandleInit() { }

    constructor(
        private dashboardService: InnkeeperService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,

    ) {}
    url = environment.url;

    checkquan=false;
    quan:any;
    idquan:number=0;
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        this.getQuanByIdAndTokenInnkeeper(this.idquan);
    }

    getQuanByIdAndTokenInnkeeper(id: number){
        this.checkquan=false;
        this.dashboardService.getQuanByIdAndTokenInnkeeper(id).subscribe(data=>{
            if (data.status) {
                this.quan=data.quan;
                this.checkquan=true;
                this.changeDetectorRef.detectChanges();   
            }else{
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                });
                this.router.navigate(['/innkeeper/quans']);


            }
        })
    }
    Cancel(){
        this.router.navigate(['/innkeeper/quans/'+ this.idquan]);

    }
    edit(name:string, address:string, linkaddress: string,kinhdo: string,vido: string){
        Swal.fire({
            title: "bạn có muốn lưu thông tin này không?",
            showCancelButton: true,
            confirmButtonText: 'Lưu',
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                if (this.file) {
                    formData.append('image', this.file, this.file.name);
                }
                formData.append('id', this.idquan+"");
                formData.append('name', name);
                formData.append('address', address);
                formData.append('linkaddress', linkaddress);
                formData.append('kinhdo', kinhdo);
                formData.append('vido', vido);
                this.dashboardService.editQuanByTokenInnkeeper(formData).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'bạn đã lưu thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.router.navigate(['/innkeeper/innkeeper'])
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })

                    }
                })
            }
        }) 
    }
}
