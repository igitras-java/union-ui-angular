import { Component, OnInit } from '@angular/core';
import { Profile } from '../../shared/model/account/profile';
import { AccountService } from '../../shared/service/account/account.service';
import { ActivatedRoute } from '@angular/router';
import { Requests } from '../../shared/util/request';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profile: Profile = new Profile();

    private loading: boolean = true;

    constructor(private $accountService: AccountService, private $route: ActivatedRoute, private requests: Requests) {
    }

    ngOnInit() {
        this.$accountService.viewProfile()
            .subscribe(
                prof => this.profile = prof,
                error => this.requests.handleError(error),
                () => this.loading = false
            );
    }

    generateToken() {
        this.$accountService.createToken()
            .subscribe(
                prof => this.profile = prof,
                error => this.requests.handleError(error),
                () => this.loading = false
            );
    }

    hasToken(): boolean {
        console.log(this.profile);
        return this.profile.token !== '';
    }

}
