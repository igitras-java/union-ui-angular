import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService, Role } from '../service/common/auth.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    public canActivate(): boolean {
        if (!this.authService.hasRole(<Role>{name: 'ADMIN'})) {
            alert("您 还 没 有 该 操 作 权 限, 请 联 系 管 理 员 操 作!");
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}