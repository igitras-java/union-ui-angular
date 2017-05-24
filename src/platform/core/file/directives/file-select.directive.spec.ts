import {
  TestBed,
  inject,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { CovalentFileModule, IgFileSelectDirective } from '../file.module';
import { By } from '@angular/platform-browser';

describe('Directive: FileSelect', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IgFileSelectBasicTestComponent,
      ],
      imports: [
        CovalentFileModule,
      ],
    });
    TestBed.compileComponents();
  }));

  it('should add multiple attr',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileSelectBasicTestComponent);
      let component: IgFileSelectBasicTestComponent = fixture.debugElement.componentInstance;
      component.multiple = true;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let directive: DebugElement = fixture.debugElement.query(By.directive(IgFileSelectDirective));
        expect((<any>directive.attributes).multiple).toBeDefined();
      });
  })));

  it('should throw (fileSelect) event for a single file',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(IgFileSelectBasicTestComponent);
      let component: IgFileSelectBasicTestComponent = fixture.debugElement.componentInstance;
      component.multiple = false;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let directive: DebugElement = fixture.debugElement.query(By.directive(IgFileSelectDirective));
        directive.triggerEventHandler('change', {
          target: directive.nativeElement,
        });
      });
  })));

});

@Component({
  selector: 'ig-file-select-basic-test',
  template: `
  <input igFileSelect
         type="file"
         [multiple]="multiple" 
         (fileSelect)="files = $event">
  `,
})
class IgFileSelectBasicTestComponent {
  multiple: boolean;
  disabled: boolean;
  files: FileList | File;
}
