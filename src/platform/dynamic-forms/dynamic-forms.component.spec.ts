import {
  TestBed,
  inject,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import 'hammerjs';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DynamicType, DynamicElement, IDynamicElementConfig,
         DynamicElementComponent, DynamicFormsComponent, IgDynamicFormsModule } from './';

describe('Component: DynamicForms', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        IgDynamicFormsModule,
      ],
      declarations: [
        DynamicFormsTestComponent,
      ],
    });
    TestBed.compileComponents();
  }));

  it('should create the component', async(inject([], () => {

    let fixture: ComponentFixture<any> = TestBed.createComponent(DynamicFormsTestComponent);
    let component: DynamicFormsTestComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(component).toBeTruthy();

  })));

  it('should render dynamic elements', async(inject([], () => {

    let fixture: ComponentFixture<any> = TestBed.createComponent(DynamicFormsTestComponent);
    let component: DynamicFormsTestComponent = fixture.debugElement.componentInstance;

    expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(0);
    component.elements = [{
      name: 'first_name',
      type: DynamicType.Text,
    }, {
      name: 'password',
      type: DynamicElement.Password,
    }, {
      name: 'on_it',
      type: DynamicType.Boolean,
    }, {
      name: 'age',
      type: DynamicType.Number,
    }, {
      name: 'nodes',
      type: DynamicElement.Slider,
    }, {
      name: 'description',
      type: DynamicElement.Textarea,
    }, {
      name: 'sex',
      type: DynamicType.Array,
      selections: ['M', 'F'],
    }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(7);
    });
  })));

  it('should render dynamic elements and show form invalid because an input is required', async(inject([], () => {

    let fixture: ComponentFixture<any> = TestBed.createComponent(DynamicFormsTestComponent);
    let component: DynamicFormsTestComponent = fixture.debugElement.componentInstance;

    expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(0);
    component.elements = [{
      name: 'first_name',
      type: DynamicType.Text,
      required: true,
    }, {
      name: 'on_it',
      type: DynamicType.Boolean,
      default: true,
    }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(2);
      let dynamicFormsComponent: DynamicFormsComponent =
          fixture.debugElement.query(By.directive(DynamicFormsComponent)).componentInstance;
      expect(dynamicFormsComponent.valid).toBeFalsy();
      /* tslint:disable-next-line */
      expect(JSON.stringify(dynamicFormsComponent.value)).toBe(JSON.stringify({first_name: null, on_it: true}));
    });
  })));

  it('should render dynamic elements and show form invalid because a number is less than min', async(inject([], () => {

    let fixture: ComponentFixture<any> = TestBed.createComponent(DynamicFormsTestComponent);
    let component: DynamicFormsTestComponent = fixture.debugElement.componentInstance;

    expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(0);
    component.elements = [{
      name: 'first_name',
      type: DynamicType.Text,
      required: true,
    }, {
      name: 'age',
      type: DynamicType.Number,
      min: 18,
      default: 17,
    }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(2);
      let dynamicFormsComponent: DynamicFormsComponent =
          fixture.debugElement.query(By.directive(DynamicFormsComponent)).componentInstance;
      expect(dynamicFormsComponent.valid).toBeFalsy();
      /* tslint:disable-next-line */
      expect(JSON.stringify(dynamicFormsComponent.value)).toBe(JSON.stringify({first_name: null, age: 17}));
    });
  })));

  it('should render dynamic elements and show form valid', async(inject([], () => {

    let fixture: ComponentFixture<any> = TestBed.createComponent(DynamicFormsTestComponent);
    let component: DynamicFormsTestComponent = fixture.debugElement.componentInstance;

    expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(0);
    component.elements = [{
      name: 'first_name',
      type: DynamicType.Text,
      required: true,
      default: 'name',
    }, {
      name: 'age',
      type: DynamicType.Number,
      default: 20,
      min: 18,
      max: 30,
    }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.directive(DynamicElementComponent)).length).toBe(2);
      let dynamicFormsComponent: DynamicFormsComponent =
          fixture.debugElement.query(By.directive(DynamicFormsComponent)).componentInstance;
      expect(dynamicFormsComponent.valid).toBeTruthy();
      /* tslint:disable-next-line */
      expect(JSON.stringify(dynamicFormsComponent.value)).toBe(JSON.stringify({first_name: 'name', age: 20}));
    });
  })));
});

@Component({
  template: `
    <dynamic-forms [elements]="elements">
    </dynamic-forms>`,
})
class DynamicFormsTestComponent {
  elements: IDynamicElementConfig[];
}
