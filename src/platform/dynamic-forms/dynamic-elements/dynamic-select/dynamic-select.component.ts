import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const SELECT_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DynamicSelectComponent),
    multi: true,
};

@Component({
    providers: [SELECT_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR],
    selector: 'dynamic-select',
    styleUrls: ['./dynamic-select.component.scss'],
    templateUrl: './dynamic-select.component.html',
})
export class DynamicSelectComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

    control: FormControl;

    label: string = '';

    required: boolean = undefined;

    selections: any[] = undefined;

}
