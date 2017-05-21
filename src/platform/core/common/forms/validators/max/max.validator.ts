import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

import { IgValidators } from '../validators';

export const MAX_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidator),
    multi: true,
};

@Directive({
    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
    providers: [MAX_VALIDATOR],
})
export class MaxValidator implements Validator {

    private _validator: ValidatorFn;

    @Input('max')
    set max(max: number) {
        this._validator = IgValidators.max(max);
    }

    validate(c: AbstractControl): { [key: string]: any } {
        return this._validator(c);
    }
}
