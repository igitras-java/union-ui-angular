import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const CHECKBOX_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DynamicCheckboxComponent),
    multi: true,
};

@Component({
    providers: [CHECKBOX_INPUT_CONTROL_VALUE_ACCESSOR],
    selector: 'dynamic-checkbox',
    styleUrls: ['./dynamic-checkbox.component.scss'],
    templateUrl: './dynamic-checkbox.component.html',
})
export class DynamicCheckboxComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

    control: FormControl;

    label: string = '';

    required: boolean = false;

}
