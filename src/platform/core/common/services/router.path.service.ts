import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Injectable()
export class IgRouterPathService {
    private static _previousRoute: string = '/';

    constructor(private _router: Router) {
        this._router.events
            .filter((e: any) => e instanceof RoutesRecognized)
            .pairwise()
            .subscribe((e: any[]) => {
                IgRouterPathService._previousRoute = e[0].urlAfterRedirects;
            });
    }

    /*
     * Utility function to get the route the user previously went to
     * good for use in a "back button"
     */
    getPreviousRoute(): string {
        return IgRouterPathService._previousRoute;
    }
}
