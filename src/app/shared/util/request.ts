import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { deserialize, Type } from 'class-transformer';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../service/common/auth.service';
import { Dumy, Page } from '../model/page';

/**
 * Created by mason on 03/11/2016.
 */
@Injectable()
export class Requests {

    constructor(private router: Router, private authService: AuthService) {
    }

    /**
     * Default http request header setting.
     *
     * @returns {Headers}
     */
    private getHeaders() {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    public options(): RequestOptions {
        const headers = this.getHeaders();
        return new RequestOptions({headers: headers, withCredentials: true});
    }

    public handleError(error: any): any {
        if (error.status === 401 || error.status === 0) {
            this.authService.clearAuth();
            this.router.navigate(['/account/login']);
            return Observable.throw([]);
        } else if (error.status < 302) {
            this.authService.clearAuth();
            this.router.navigate(['/account/login']);
            return Observable.throw([]);
        } else if (error.status >= 400) {
            alert(this.buildMessage(deserialize(RequestError, error._body)));
            return Observable.throw('');
        }

        if (error.message === 'user.not-register') {
            this.router.navigate(['/account/confirm']);
            return Observable.throw([]);
        }

        alert(error.message);
        return Observable.throw('');
    }

    public navigate(commands: any[], extras?: NavigationExtras) {
        return this.router.navigate(commands, extras);
    }

    buildMessage(error: RequestError): string {
        let message = error.message;
        if (error.errors.length > 0) {
            error.errors.forEach(sub => {
                message += '\n\t' + sub.message;
            });
        }
        return message;
    }

    buildParams(page: Page<any>): string {
        console.log(page);
        if (page === undefined) {
            page = new Page<Dumy>(Dumy);
        }

        return `page=${page.number}&size=${page.size}`;
    }
}

/**
 * Request Error.
 */
export class RequestError {
    code: string;
    link: string;
    message: string;
    @Type(() => RequestError)
    errors: RequestError[] = [];
}