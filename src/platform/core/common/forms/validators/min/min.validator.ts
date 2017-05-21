import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { IgValidators } from '../validators';

export const MIN_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidator),
    multi: true,
};

@Directive({
    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
    providers: [MIN_VALIDATOR],
})
export class MinValidator implements Validator {

    private _validator: ValidatorFn;

    @Input('min')
    set min(min: number) {
        this._validator = IgValidators.min(min);
    }

    validate(c: AbstractControl): { [key: string]: any } {
        return this._validator(c);
    }
}
