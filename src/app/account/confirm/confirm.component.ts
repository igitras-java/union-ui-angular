import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/service/account/account.service';
import { Requests } from '../../shared/util/request';
import { Profile } from '../../shared/model/account/profile';
import { Auth, AuthService } from '../../shared/service/common/auth.service';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

    constructor(private accountService: AccountService,
                private authService: AuthService,
                private router: Router,
                private requests: Requests) {
    }

    ngOnInit() {
    }

    confirmUsingGM() {
        this.accountService.createProfile().subscribe(
            resp => this.handleCreateProfile(resp),
            error => this.requests.handleError(error),
            () => this.router.navigate(['/'])
        );
    }

    private handleCreateProfile(resp: Profile) {
        this.authService.storeAuth(<Auth>({
            token: resp.name,
            roles: []
        }));
    }
}
