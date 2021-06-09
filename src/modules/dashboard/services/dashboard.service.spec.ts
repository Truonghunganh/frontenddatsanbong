import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
    let dashboardService: DashboardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DashboardService],
        });
        dashboardService = TestBed.inject(DashboardService);
    });

  
});
