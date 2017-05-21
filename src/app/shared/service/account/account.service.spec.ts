/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';

describe('Service: Account', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AccountService]
        });
    });

    it('should ...', inject([AccountService], (service: AccountService) => {
        expect(service).toBeTruthy();
    }));
});
