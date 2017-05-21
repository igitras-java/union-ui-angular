import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Profile } from '../../model/account/profile';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { deserialize } from 'class-transformer/index';
import { Observable } from 'rxjs/Rx';
import { Requests } from '../../util/request';

// Import RxJs required methods

@Injectable()
export class AccountService {
    private profileUrl = `${environment.API_BASE}/accounts/profile`;
    private tokenUrl = `${environment.API_BASE}/accounts/token`;

    constructor(private http: Http, private router: Router, private requests: Requests) {
    }

    viewProfile(): Observable<Profile> {
        return this.http
            .get(this.profileUrl, this.requests.options())
            .map(resp => {
                let text = resp.text();

                if (text === '') {
                    throw new Error('user.not-register');
                }

                return text;
            })
            .map(json => deserialize(Profile, json));
    }

    createProfile(): Observable<Profile> {
        return this.http.post(this.profileUrl, null, this.requests.options())
            .map(resp => resp.text())
            .map(json => deserialize(Profile, json));
    }

    createToken(): Observable<Profile> {
        return this.http.put(this.tokenUrl, null, this.requests.options())
            .map(resp => deserialize(Profile, resp.text()));
    }

}
