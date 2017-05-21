import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { IgValidators } from '../../core';

import { DynamicInputComponent } from '../dynamic-elements/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from '../dynamic-elements/dynamic-textarea/dynamic-textarea.component';
import { DynamicSlideToggleComponent } from '../dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component';
import { DynamicCheckboxComponent } from '../dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicSliderComponent } from '../dynamic-elements/dynamic-slider/dynamic-slider.component';
import { DynamicSelectComponent } from '../dynamic-elements/dynamic-select/dynamic-select.component';

export enum DynamicType {
    Text = <any>'text',
    Boolean = <any>'boolean',
    Number = <any>'number',
    Array = <any>'array',
}

export enum DynamicElement {
    Input = <any>'input',
    Password = <any>'password',
    Textarea = <any>'textarea',
    Slider = <any>'slider',
    SlideToggle = <any>'slide-toggle',
    Checkbox = <any>'checkbox',
    Select = <any>'select',
}

export interface IDynamicElementConfig {
    label?: string;
    name: string;
    type: DynamicType | DynamicElement;
    required?: boolean;
    min?: any;
    max?: any;
    selections?: any[];
    default?: any;
}

export const DYNAMIC_ELEMENT_NAME_REGEX: RegExp = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/;

@Injectable()
export class DynamicFormsService {

    /**
     * Method to validate if the [name] is a proper element name.
     * Throws error if name is not valid.
     */
    validateDynamicElementName(name: string): void {
        if (!DYNAMIC_ELEMENT_NAME_REGEX.test(name)) {
            throw new Error(`Dynamic element name: "${name}" is not valid.`);
        }
    }

    /**
     * Gets component to be rendered depending on [DynamicElement | DynamicType]
     * Throws error if it does not exists or not supported.
     */
    getDynamicElement(element: DynamicElement | DynamicType): any {
        switch (element) {
            case DynamicType.Text:
            case DynamicType.Number:
            case DynamicElement.Input:
            case DynamicElement.Password:
                return DynamicInputComponent;
            case DynamicElement.Textarea:
                return DynamicTextareaComponent;
            case DynamicType.Boolean:
            case DynamicElement.SlideToggle:
                return DynamicSlideToggleComponent;
            case DynamicElement.Checkbox:
                return DynamicCheckboxComponent;
            case DynamicElement.Slider:
                return DynamicSliderComponent;
            case DynamicType.Array:
            case DynamicElement.Select:
                return DynamicSelectComponent;
            default:
                throw new Error(`Error: type ${element} does not exist or not supported.`);
        }
    }

    /**
     * Gets default flex for element depending on [DynamicElement | DynamicType].
     * Throws error if it does not exists or not supported.
     */
    getDefaultElementFlex(element: DynamicElement | DynamicType): any {
        switch (element) {
            case DynamicType.Text:
            case DynamicType.Number:
            case DynamicElement.Slider:
            case DynamicElement.Input:
            case DynamicElement.Password:
            case DynamicType.Array:
            case DynamicElement.Select:
                return 45;
            case DynamicElement.Textarea:
                return 95;
            case DynamicType.Boolean:
            case DynamicElement.Checkbox:
            case DynamicElement.SlideToggle:
                return 20;
            default:
                throw new Error(`Error: type ${element} does not exist or not supported.`);
        }
    }

    /**
     * Creates form control for element depending [IDynamicElementConfig] properties.
     */
    createFormControl(config: IDynamicElementConfig): FormControl {
        let validator: ValidatorFn = this.createValidators(config);
        return new FormControl(config.default, validator);
    }

    /**
     * Creates form validationdepending [IDynamicElementConfig] properties.
     */
    createValidators(config: IDynamicElementConfig): ValidatorFn {
        let validator: ValidatorFn;
        if (config.required) {
            validator = Validators.required;
        }
        if (config.max || config.max === 0) {
            validator = Validators.compose([validator, IgValidators.max(config.max)]);
        }
        if (config.min || config.min === 0) {
            validator = Validators.compose([validator, IgValidators.min(config.min)]);
        }
        return validator;
    }
}
