import { TestBed } from '@angular/core/testing';

import { InnkeeperGuard } from './innkeeper.guard';

describe('_Template Module Guards', () => {
    let innkeeperGuard: InnkeeperGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [InnkeeperGuard],
        });
        innkeeperGuard = TestBed.inject(InnkeeperGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            innkeeperGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
