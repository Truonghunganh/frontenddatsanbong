import { TestBed } from '@angular/core/testing';

import { NotificationGuard } from './notification.guard';

describe('_Template Module Guards', () => {
    let notificationGuard: NotificationGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [NotificationGuard],
        });
        notificationGuard = TestBed.inject(NotificationGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            notificationGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
