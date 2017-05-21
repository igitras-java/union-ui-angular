import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControlValueAccessor } from '../abstract-control-value-accesor';

export const SLIDE_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DynamicSlideToggleComponent),
    multi: true,
};

@Component({
    providers: [SLIDE_TOGGLE_INPUT_CONTROL_VALUE_ACCESSOR],
    selector: 'dynamic-slide-toggle',
    styleUrls: ['./dynamic-slide-toggle.component.scss'],
    templateUrl: './dynamic-slide-toggle.component.html',
})
export class DynamicSlideToggleComponent extends AbstractControlValueAccessor implements ControlValueAccessor {

    control: FormControl;

    label: string = '';

    required: boolean = false;

}
