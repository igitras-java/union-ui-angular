import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/common/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate() {
        if (!this.checkAuthenticated()) {
            alert("您 还 没 有 登 录, 请 登 录!");
            this.router.navigate(['/account/login']);
            return false;
        }
        return true;
    }

    private checkAuthenticated(): boolean {
        return this.authService.isLoggedIn();
    }
}