import { Directive, Host, HostListener, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[autoTrim]',
})
export class AutoTrimDirective {

    constructor(@Optional() @Host() private _model: NgModel) {
    }

    /**
     * Listens to host's (blur) event and trims value.
     */
    @HostListener('blur', ['$event'])
    onBlur(event: Event): void {
        if (this._model && this._model.value && typeof(this._model.value) === 'string') {
            this._model.update.emit(this._model.value.trim());
        }
    }
}
