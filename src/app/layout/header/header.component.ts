import { Component, OnInit } from '@angular/core';
import { Auth, AuthService, Role } from '../../shared/service/common/auth.service';
import { AccountService } from '../../shared/service/account/account.service';
import { Profile } from '../../shared/model/account/profile';
import { Requests } from '../../shared/util/request';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    appName: string = 'Guardian Manager';
    login: boolean = false;
    accountName: string = '个人中心';

    constructor(private authService: AuthService,
                private $accountService: AccountService,
                private requests: Requests) {
    }

    ngOnInit() {
        // this.$accountService.viewProfile()
        //     .subscribe(
        //         resp => this.handleResp(resp),
        //         error => this.handleError(error),
        //         () => console.log("Success")
        //     );
    }

    logout(): void {
        let logoutUrl = `${environment.ROOT}/logout`;
        window.location.assign(logoutUrl);
    }

    isAdmin(): boolean {
        return this.authService.hasRole(<Role>{name: 'ADMIN'});
    }

    openDoc(doc: string) {
        let generateCredUrl = `${environment.ROOT}/doc/${doc}/index.html`;
        window.open(generateCredUrl, '_blank');
    }

    private handleResp(resp: Profile) {
        let auth: Auth = <Auth>{
            token: resp.name,
            roles: []
        };
        resp.roles.forEach(role => auth.roles.push(<Role>{
            name: role
        }));
        this.authService.storeAuth(auth);
        this.login = this.authService.isLoggedIn();
        this.accountName = this.authService.loginUser();
    }

    private handleError(error: any) {
        if (error.status === 401) {
            console.log(error);
        } else {
            this.requests.handleError(error);
        }
    }
}
