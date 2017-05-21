import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const INPUT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DynamicInputComponent),
    multi: true,
};

@Component({
    providers: [INPUT_INPUT_CONTROL_VALUE_ACCESSOR],
    selector: 'dynamic-input',
    styleUrls: ['./dynamic-input.component.scss'],
    templateUrl: './dynamic-input.component.html',
})
export class DynamicInputComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

    control: FormControl;

    label: string = '';

    type: string = undefined;

    required: boolean = undefined;

    min: number = undefined;

    max: number = undefined;

}
