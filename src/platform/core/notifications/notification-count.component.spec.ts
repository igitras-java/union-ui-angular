import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdIconModule } from '@angular/material';
import {
    IgNotificationCountPositionX,
    IgNotificationCountPositionY,
    IgNotificationsModule
} from './notifications.module';
import { By } from '@angular/platform-browser';

describe('Component: NotificationCount', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                IgNotificationCountBasicTestComponent,
                IgNotificationCountContentTestComponent,
                IgNotificationCountPositionTestComponent,
                IgNotificationCountPositionContentTestComponent,
            ],
            imports: [
                MdIconModule,
                IgNotificationsModule,
            ],
        });
        TestBed.compileComponents();
    }));

    it('should render component with no notification tip',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountBasicTestComponent);
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.ig-notification-content'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))).toBeFalsy();
                expect(fixture.debugElement.query(By.css('.ig-notification-no-count'))).toBeFalsy();
            });
        })));

    it('should render component notification tip with no count nor number',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountBasicTestComponent);
            let component: IgNotificationCountBasicTestComponent = fixture.debugElement.componentInstance;
            component.notifications = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-no-count'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))
                    .nativeElement.textContent.trim()).toBeFalsy();
            });
        })));

    it('should render component notification tip with count and number',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountBasicTestComponent);
            let component: IgNotificationCountBasicTestComponent = fixture.debugElement.componentInstance;
            component.notifications = 44;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-no-count'))).toBeFalsy();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))
                    .nativeElement.textContent.trim()).toContain(component.notifications);
            });
        })));

    it('should render component with notification tip hidden',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountBasicTestComponent);
            let component: IgNotificationCountBasicTestComponent = fixture.debugElement.componentInstance;
            component.notifications = 0;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))).toBeFalsy();
                expect(fixture.debugElement.query(By.css('.ig-notification-no-count'))).toBeFalsy();
            });
        })));

    it('should render component with notification tip and then hide it',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountBasicTestComponent);
            let component: IgNotificationCountBasicTestComponent = fixture.debugElement.componentInstance;
            component.notifications = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))).toBeTruthy();
                component.notifications = false;
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    expect(fixture.debugElement.query(By.css('.ig-notification-count'))).toBeFalsy();
                });
            });
        })));

    it('should render component notification tip with count and 99+',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountBasicTestComponent);
            let component: IgNotificationCountBasicTestComponent = fixture.debugElement.componentInstance;
            component.notifications = 100;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-no-count'))).toBeFalsy();
                expect(fixture.debugElement.query(By.css('.ig-notification-count'))
                    .nativeElement.textContent.trim()).toContain('99+');
            });
        })));

    it('should render component with content transcluded',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountContentTestComponent);
            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(fixture.debugElement.query(By.css('.ig-notification-content'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('md-icon'))).toBeTruthy();
            });
        })));

    it('should render component with content and default positionY top and position X after',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountPositionContentTestComponent);
            let component: IgNotificationCountPositionContentTestComponent = fixture.debugElement.componentInstance;
            component.notifications = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(fixture.debugElement.query(By.css('.ig-notification-top'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-after'))).toBeTruthy();
            });
        })));

    it('should render component with no content and default positionY top and position X after',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountPositionTestComponent);
            let component: IgNotificationCountPositionTestComponent = fixture.debugElement.componentInstance;
            component.notifications = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(fixture.debugElement.query(By.css('.ig-notification-center-x'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-center-y'))).toBeTruthy();
            });
        })));

    it('should render component with positionY bottom and position X before',
        async(inject([], () => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(IgNotificationCountPositionTestComponent);
            let component: IgNotificationCountPositionTestComponent = fixture.debugElement.componentInstance;
            component.notifications = true;
            component.positionX = IgNotificationCountPositionX.Before;
            component.positionY = IgNotificationCountPositionY.Bottom;
            fixture.detectChanges();
            fixture.whenStable().then(() => {

                expect(fixture.debugElement.query(By.css('.ig-notification-before'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.ig-notification-bottom'))).toBeTruthy();
            });
        })));

});

@Component({
    selector: 'ig-notification-count-basic-test',
    template: `
        <ig-notification-count color="color" [notifications]="notifications">

        </ig-notification-count>
    `,
})
class IgNotificationCountBasicTestComponent {

    color: string;
    notifications: any;

}

@Component({
    selector: 'ig-notification-count-content-test',
    template: `
        <ig-notification-count>
            <md-icon>notifications</md-icon>
        </ig-notification-count>
    `,
})
class IgNotificationCountContentTestComponent {
}

@Component({
    selector: 'ig-notification-count-position-test',
    template: `
        <ig-notification-count [positionX]="positionX" [positionY]="positionY" [notifications]="notifications">

        </ig-notification-count>
    `,
})
class IgNotificationCountPositionTestComponent {

    positionX: IgNotificationCountPositionX | string;
    positionY: IgNotificationCountPositionY | string;
    notifications: any;

}

@Component({
    selector: 'ig-notification-count-position-content-test',
    template: `
        <ig-notification-count [positionX]="positionX" [positionY]="positionY" [notifications]="notifications">
            <md-icon>notifications</md-icon>
        </ig-notification-count>
    `,
})
class IgNotificationCountPositionContentTestComponent {

    positionX: IgNotificationCountPositionX | string;
    positionY: IgNotificationCountPositionY | string;
    notifications: any;

}
