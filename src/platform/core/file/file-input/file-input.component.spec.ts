import {
  TestBed,
  inject,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CovalentFileModule, IgFileInputComponent } from '../file.module';
import { By } from '@angular/platform-browser';

describe('Component: FileInput', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IgFileInputBasicTestComponent,
        IgFileInputModelTestComponent,
      ],
      imports: [
        FormsModule,
        CovalentFileModule,
      ],
    });
    TestBed.compileComponents();
  }));

  it('should render content inside .ig-file-input button',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileInputBasicTestComponent);
      let component: IgFileInputBasicTestComponent = fixture.debugElement.componentInstance;
      component.multiple = false;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(fixture.debugElement.query(By.css('.ig-file-input span'))).toBeTruthy();
      });
  })));

  it('should mimic file selection and then clear it',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileInputBasicTestComponent);
      let component: IgFileInputBasicTestComponent = fixture.debugElement.componentInstance;
      component.multiple = false;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.handleSelect([{}]);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.clear();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.value)
            .toBeUndefined();
          });
        });
      });
  })));

  it('should mimic file selection and then clear it by disabling it',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileInputBasicTestComponent);
      let component: IgFileInputBasicTestComponent = fixture.debugElement.componentInstance;
      component.multiple = false;
      component.disabled = false;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.handleSelect([{}]);
        component.disabled = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.value).toBeUndefined();
        });
      });
  })));

  it('should mimic file (select) event',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileInputBasicTestComponent);
      let component: IgFileInputBasicTestComponent = fixture.debugElement.componentInstance;
      component.multiple = false;
      fixture.detectChanges();
      expect(component.files).toBeUndefined();
      fixture.whenStable().then(() => {
        fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.handleSelect([{}]);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.files).toBeTruthy();
        });
      });
  })));

  it('should mimic file selection event and check model',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileInputModelTestComponent);
      let component: IgFileInputModelTestComponent = fixture.debugElement.componentInstance;
      component.multiple = false;
      fixture.detectChanges();
      expect(component.files).toBeUndefined();
      fixture.whenStable().then(() => {
        fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.handleSelect([{}]);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.files).toBeTruthy();
        });
      });
  })));

  it('should mimic file selection event and check model and then clear it by disabling it',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileInputModelTestComponent);
      let component: IgFileInputModelTestComponent = fixture.debugElement.componentInstance;
      component.multiple = false;
      fixture.detectChanges();
      expect(component.files).toBeUndefined();
      fixture.whenStable().then(() => {
        fixture.debugElement.query(By.directive(IgFileInputComponent)).componentInstance.handleSelect([{}]);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.files).toBeTruthy();
          component.disabled = true;
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.files).toBeUndefined();
          });
        });
      });
  })));

});

@Component({
  selector: 'ig-file-input-basic-test',
  template: `
  <ig-file-input [multiple]="multiple" [disabled]="disabled" (select)="files = $event">
    <span>test</span>
  </ig-file-input>
  `,
})
class IgFileInputBasicTestComponent {
  accept: string;
  multiple: boolean;
  disabled: boolean;
  files: File | FileList;
}

@Component({
  selector: 'ig-file-input-model-test',
  template: `
  <ig-file-input [(ngModel)]="files" [multiple]="multiple" [disabled]="disabled">
    <span>test</span>
  </ig-file-input>
  `,
})
class IgFileInputModelTestComponent {
  multiple: boolean;
  disabled: boolean;
  files: File | FileList;
}
