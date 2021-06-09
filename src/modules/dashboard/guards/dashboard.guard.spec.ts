import { TestBed } from '@angular/core/testing';

import { DashboardGuard } from './dashboard.guard';

describe('_Template Module Guards', () => {
    let dashboardGuard: DashboardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [DashboardGuard],
        });
        dashboardGuard = TestBed.inject(DashboardGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            dashboardGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
