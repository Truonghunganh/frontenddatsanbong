import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';

describe('AdminService', () => {
    let adminService: AdminService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AdminService],
        });
        adminService = TestBed.inject(AdminService);
    });

    describe('getAdmin$', () => {
        it('should return Observable<Admin>', () => {
            adminService.getAdmin$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
