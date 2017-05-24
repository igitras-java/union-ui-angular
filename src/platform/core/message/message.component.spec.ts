import {
  TestBed,
  inject,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import 'hammerjs';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IgMessageComponent } from './message.component';
import { CovalentMessageModule } from './message.module';
import { NgModule, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: Message', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CovalentMessageModule,
      ],
      declarations: [
        IgMessageBasicTestComponent,
        IgMessageContentTestComponent,
        IgMessageOpenedTestComponent,
      ],
    });
    TestBed.compileComponents();
  })); 

  it('should set label, sublabel and color `primary`, `red` and then change to color `accent`', (done: DoneFn) => {
    let fixture: ComponentFixture<any> = TestBed.createComponent(IgMessageBasicTestComponent);
    let component: IgMessageBasicTestComponent = fixture.debugElement.componentInstance;
    
    component.label = 'Label';
    component.sublabel = 'Sublabel';
    component.color = 'primary';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement.textContent).toContain('Label');
      expect(fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement.textContent).toContain('Sublabel');
      expect((<HTMLElement>fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement).classList.contains('mat-primary'))
      .toBeTruthy();
      expect(fixture.debugElement.query(By.directive(IgMessageComponent)).componentInstance.color).toBe('primary');
      component.color = 'red';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect((<HTMLElement>fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement).classList.contains('mat-primary'))
        .toBeFalsy();
        expect((<HTMLElement>fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement).classList.contains('bgc-red-100'))
        .toBeTruthy();
        expect((<HTMLElement>fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement).classList.contains('tc-red-700'))
        .toBeTruthy();
        expect(fixture.debugElement.query(By.directive(IgMessageComponent)).componentInstance.color).toBe('red');
        component.color = 'accent';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect((<HTMLElement>fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement).classList.contains('mat-accent'))
          .toBeTruthy();
          expect((<HTMLElement>fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement).classList.contains('bgc-red-100'))
          .toBeFalsy();
          expect((<HTMLElement>fixture.debugElement.query(By.directive(IgMessageComponent)).nativeElement).classList.contains('tc-red-700'))
          .toBeFalsy();
          expect(fixture.debugElement.query(By.directive(IgMessageComponent)).componentInstance.color).toBe('accent');
          done();
        });
      });
    });
  });

  it('should render the component with label and no sublabel', (done: DoneFn) => {
    let fixture: ComponentFixture<any> = TestBed.createComponent(IgMessageBasicTestComponent);
    let component: IgMessageBasicTestComponent = fixture.debugElement.componentInstance;

    component.label = 'Label';
    component.color = 'primary';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.ig-message-label'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.ig-message-sublabel'))).toBeFalsy();
      done();
    });
  });

  it('should render the component with a button content as actions', (done: DoneFn) => {
    let fixture: ComponentFixture<any> = TestBed.createComponent(IgMessageContentTestComponent);
    let component: IgMessageContentTestComponent = fixture.debugElement.componentInstance;

    component.color = 'primary';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.ig-message-wrapper')).query(By.css('button'))).toBeTruthy();
      done();
    });
  });

  it('should render the component, close it and then open it', (done: DoneFn) => {
    let fixture: ComponentFixture<any> = TestBed.createComponent(IgMessageBasicTestComponent);
    let component: IgMessageBasicTestComponent = fixture.debugElement.componentInstance;
    let message: IgMessageComponent = fixture.debugElement.query(By.directive(IgMessageComponent)).componentInstance;

    component.label = 'Label';
    component.color = 'primary';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeTruthy();

      message.close();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeFalsy();

        message.open();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeTruthy();
          done();
        });
      });
    });
  });

  it('should render the component, toggle it and then toggle it again', (done: DoneFn) => {
    let fixture: ComponentFixture<any> = TestBed.createComponent(IgMessageBasicTestComponent);
    let component: IgMessageBasicTestComponent = fixture.debugElement.componentInstance;
    let message: IgMessageComponent = fixture.debugElement.query(By.directive(IgMessageComponent)).componentInstance;

    component.label = 'Label';
    component.color = 'primary';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeTruthy();

      message.toggle();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeFalsy();

        message.toggle();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeTruthy();
          done();
        });
      });
    });
  });

  it('should not render the component, set [opened] to true and then [opened] to false', (done: DoneFn) => {
    let fixture: ComponentFixture<any> = TestBed.createComponent(IgMessageOpenedTestComponent);
    let component: IgMessageOpenedTestComponent = fixture.debugElement.componentInstance;

    component.label = 'Label';
    component.color = 'primary';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeFalsy();

      component.opened = true;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeTruthy();

        component.opened = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('.ig-message-wrapper'))).toBeFalsy();
          done();
        });
      });
    });
  });
});

@Component({
  template: `
    <ig-message [label]="label" [sublabel]="sublabel" [color]="color">
    </ig-message>`,
})
class IgMessageBasicTestComponent {
  label: string;
  sublabel: string;
  color: string;
}

@Component({
  template: `
    <ig-message [label]="label" [sublabel]="sublabel" [color]="color">
      <button ig-message-actions>BUTTON</button>
    </ig-message>`,
})
class IgMessageContentTestComponent {
  label: string = 'Label';
  sublabel: string = 'Sublabel';
  color: string = 'primary';
}

@Component({
  template: `
    <ig-message [label]="label" [color]="color" [opened]="opened">
    </ig-message>`,
})
class IgMessageOpenedTestComponent {
  label: string;
  color: string;
  opened: boolean;
}
