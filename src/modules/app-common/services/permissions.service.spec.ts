import { TestBed } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
    let permissionsService: PermissionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PermissionsService],
        });
        permissionsService = TestBed.inject(PermissionsService);
    });

    describe('getPermissions$', () => {
        it('should return Observable<{}}>', () => {
            permissionsService.getPermissions$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
