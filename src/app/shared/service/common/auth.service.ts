import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer/index';

export class Auth {
    token: string;
    roles: Role[];
}

export class Role {
    name: string;
}

@Injectable()
export class AuthService {
    private token: string = "Authentication";

    constructor() {
    }

    auth(): Auth {
        return this.readToken();
    }

    storeAuth(auth: Auth): void {
        this.storeToken(auth);
    }

    clearAuth(): void {
        this.cleanToken();
    }

    loginUser(): string {
        let auth: Auth = this.readToken();
        if (auth !== null) {
            return auth.token;
        }
        return null;
    }

    isLoggedIn(): boolean {
        let auth: Auth = this.readToken();
        return auth !== null && auth.token !== null;
    }

    hasRole(role: Role): boolean {
        if (!this.isLoggedIn()) {
            return false;
        }

        let auth: Auth = this.readToken();
        var result: boolean = auth.roles.filter(r => role.name === r.name).length > 0;
        return result;
    }

    hasAnyRole(roles: Role[]): boolean {
        if (!this.isLoggedIn()) {
            return false;
        }
        if (roles.length === 0) {
            return false;
        }

        let auth: Auth = this.readToken();
        return auth.roles
                .filter(r => roles.filter(r2 => r2.name === r.name).length > 0)
                .length > 0;
    }

    private readToken(): any | Auth {
        let sItem = sessionStorage.getItem(this.token);
        let lItem = localStorage.getItem(this.token);
        if (sItem !== undefined && sItem !== null) {
            let jsonAuth = JSON.parse(sItem);
            return plainToClass(Auth, jsonAuth);
        }

        if (lItem !== undefined && lItem !== null) {
            let jsonAuth = JSON.parse(lItem);
            return plainToClass(Auth, jsonAuth);
        }
        return null;
    }

    private storeToken(auth: Auth): void {
        let jsonAuth = classToPlain(auth);
        let stringAuth = JSON.stringify(jsonAuth);
        sessionStorage.setItem(this.token, stringAuth);
        localStorage.setItem(this.token, stringAuth);
    }

    private cleanToken(): void {
        sessionStorage.removeItem(this.token);
        localStorage.removeItem(this.token);
    }
}
