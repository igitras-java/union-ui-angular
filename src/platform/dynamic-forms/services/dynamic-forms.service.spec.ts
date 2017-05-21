import {
  TestBed,
  inject,
  async,
} from '@angular/core/testing';
import { DynamicFormsService, DynamicType,
         DynamicElement } from './dynamic-forms.service';

describe('Service: DynamicFormsService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormsService,
      ],
    });
  }));

  it('expect to validate element names correctly',
    async(inject([DynamicFormsService], (service: DynamicFormsService) => {
      try {
        service.validateDynamicElementName('normal-name');
      } catch (e) {
        expect(e).toBeFalsy('name should be validated correctly');
      }

      try {
        service.validateDynamicElementName('normal_22_name');
      } catch (e) {
        expect(e).toBeFalsy('name should be validated correctly');
      }

      try {
        service.validateDynamicElementName('normal_22-name_22');
      } catch (e) {
        expect(e).toBeFalsy('name should be validated correctly');
      }

      try {
        service.validateDynamicElementName('2normal_22-name_22');
        expect(false).toBeTruthy('2normal_22-name_22 name should not be validated correctly');
      } catch (e) { /* */ }

      try {
        service.validateDynamicElementName('normal@22-name_22');
        expect(false).toBeTruthy('normal@22-name_22 name should not be validated correctly');
      } catch (e) { /* */ }

    }),
  ));

  it('expect to return components depending on type | element',
    async(inject([DynamicFormsService], (service: DynamicFormsService) => {

      expect(service.getDynamicElement(DynamicType.Text)).toBeTruthy();
      expect(service.getDynamicElement(DynamicType.Number)).toBeTruthy();
      expect(service.getDynamicElement(DynamicType.Boolean)).toBeTruthy();
      expect(service.getDynamicElement(DynamicType.Array)).toBeTruthy();

      expect(service.getDynamicElement(DynamicElement.Input)).toBeTruthy();
      expect(service.getDynamicElement(DynamicElement.Textarea)).toBeTruthy();
      expect(service.getDynamicElement(DynamicElement.Checkbox)).toBeTruthy();
      expect(service.getDynamicElement(DynamicElement.Slider)).toBeTruthy();
      expect(service.getDynamicElement(DynamicElement.SlideToggle)).toBeTruthy();
      expect(service.getDynamicElement(DynamicElement.Select)).toBeTruthy();

      try {
        expect(service.getDynamicElement(undefined)).toBeFalsy('expect not to return a component');
      } catch (e) {
        expect(e).toBeTruthy();
      }
    }),
  ));

  it('expect to return default flex depending on type | element',
    async(inject([DynamicFormsService], (service: DynamicFormsService) => {

      expect(service.getDefaultElementFlex(DynamicType.Text)).toBe(45);
      expect(service.getDefaultElementFlex(DynamicType.Number)).toBe(45);
      expect(service.getDefaultElementFlex(DynamicType.Boolean)).toBe(20);
      expect(service.getDefaultElementFlex(DynamicType.Array)).toBe(45);

      expect(service.getDefaultElementFlex(DynamicElement.Input)).toBe(45);
      expect(service.getDefaultElementFlex(DynamicElement.Textarea)).toBe(95);
      expect(service.getDefaultElementFlex(DynamicElement.Checkbox)).toBe(20);
      expect(service.getDefaultElementFlex(DynamicElement.Slider)).toBe(45);
      expect(service.getDefaultElementFlex(DynamicElement.SlideToggle)).toBe(20);
      expect(service.getDefaultElementFlex(DynamicElement.Select)).toBe(45);

      try {
        expect(service.getDefaultElementFlex(undefined)).toBeFalsy('expect not to return a component');
      } catch (e) {
        expect(e).toBeTruthy();
      }
    }),
  ));

});
