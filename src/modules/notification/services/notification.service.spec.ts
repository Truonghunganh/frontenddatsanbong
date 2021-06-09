import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    let notificationService: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationService],
        });
        notificationService = TestBed.inject(NotificationService);
    });

    describe('getNotification$', () => {
        it('should return Observable<Notification>', () => {
            notificationService.getNotification$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
