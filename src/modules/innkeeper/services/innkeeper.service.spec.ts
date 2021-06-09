import { TestBed } from '@angular/core/testing';

import { InnkeeperService } from './innkeeper.service';

describe('InnkeeperService', () => {
    let innkeeperService: InnkeeperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InnkeeperService],
        });
        innkeeperService = TestBed.inject(InnkeeperService);
    });

    describe('getInnkeeper$', () => {
        it('should return Observable<Innkeeper>', () => {
            innkeeperService.getInnkeeper$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
