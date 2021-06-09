import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Notification } from './../../models/notification.model';
import { NotificationService } from './../../services/notification.service';

@Component({
    selector: 'sb-notification-add',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './notification-add.component.html',
    styleUrls: ['notification-add.component.scss'],
})
export class NotificationAddComponent implements OnInit {
    types = ['All', 'Doctor', 'Customer'];
    type = 'All';

    constructor(private notificationService: NotificationService) {}
    ngOnInit() {}
    onChangeCategory(type: string) {
        this.type = type;
    }
    sentNotification(title: string, message: string) {
        const notification = new Notification(title, message, this.type);
        this.notificationService.sentNotification(notification).subscribe(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }
}
