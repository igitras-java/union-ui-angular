import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/common/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loggedIn: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.loggedIn = this.authService.isLoggedIn();
    }

    goHome(): void {
        this.router.navigate(['/']);
    }

    loginUuap() {
        let loginUrl = `${environment.ROOT}/uuap/login?redirect=${environment.UI_ROOT}/`;
        window.location.assign(loginUrl);
    }

}
