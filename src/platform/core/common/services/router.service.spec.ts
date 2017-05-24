import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IgRouterPathService } from './router.path.service';

@Component({
    selector: 'fake',
    template: `
        <router-outlet></router-outlet>
        <div>fake</div>`,
})
export class IgFakeComponent {
}

describe('Service: RouterPath', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {path: '', component: IgFakeComponent},
                    {path: 'foo', component: IgFakeComponent},
                ]),
            ],
            declarations: [
                IgFakeComponent,
            ],
            providers: [
                IgRouterPathService,
            ],
        });
        TestBed.compileComponents();
    }));

    it('route to new path and check that getPreviousRoute was set correctly',
        async(inject([Router, IgRouterPathService],
            (router: Router, routerPathService: IgRouterPathService) => {
                const fixture: ComponentFixture<IgFakeComponent> = TestBed.createComponent(IgFakeComponent);

                // navigate to /foo then navigate to /
                // which will set previous route to /foo
                router.navigate(['/foo']);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    router.navigate(['/']);
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        // have to use setTimeout so this gets pushed on end of stack
                        // and event doesn't happen before
                        setTimeout(() => {
                            expect(routerPathService.getPreviousRoute()).toBe('/foo');
                        });
                    });
                });
            })));
});
