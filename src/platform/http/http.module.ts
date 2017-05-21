import { InjectionToken, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { HttpInterceptorService, IHttpInterceptorConfig } from './interceptors/http-interceptor.service';
import { URLRegExpInterceptorMatcher } from './interceptors/url-regexp-interceptor-matcher.class';

export const HTTP_CONFIG: InjectionToken<HttpConfig> = new InjectionToken<HttpConfig>('HTTP_CONFIG');

export type HttpConfig = { interceptors: IHttpInterceptorConfig[] };

export function httpFactory(http: Http, injector: Injector, config: HttpConfig): HttpInterceptorService {
    return new HttpInterceptorService(http, injector, new URLRegExpInterceptorMatcher(), config.interceptors);
}

@NgModule({
    imports: [
        HttpModule,
    ],
})
export class IgHttpModule {
    static forRoot(config: HttpConfig = {interceptors: []}): ModuleWithProviders {
        return {
            ngModule: IgHttpModule,
            providers: [{
                provide: HTTP_CONFIG,
                useValue: config,
            }, {
                provide: HttpInterceptorService,
                useFactory: httpFactory,
                deps: [Http, Injector, HTTP_CONFIG],
            },
            ],
        };
    }
}
