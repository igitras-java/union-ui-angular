import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { DynamicFormsService, IDynamicElementConfig } from './services/dynamic-forms.service';

@Component({
    selector: 'dynamic-forms',
    templateUrl: './dynamic-forms.component.html',
})
export class DynamicFormsComponent {

    private _elements: IDynamicElementConfig[];

    dynamicForm: FormGroup;

    /**
     * elements: IDynamicElementConfig[]
     * JS Object that will render the elements depending on its config.
     * [name] property is required.
     */
    @Input('elements')
    set elements(elements: IDynamicElementConfig[]) {
        if (elements) {
            if (this._elements) {
                this._elements.forEach((elem: IDynamicElementConfig) => {
                    this.dynamicForm.removeControl(elem.name);
                });
            }
            let duplicates: string[] = [];
            elements.forEach((elem: IDynamicElementConfig) => {
                this._dynamicFormsService.validateDynamicElementName(elem.name);
                if (duplicates.indexOf(elem.name) > -1) {
                    throw new Error(`Dynamic element name: "${elem.name}" is duplicated`);
                }
                duplicates.push(elem.name);
                this.dynamicForm.registerControl(elem.name, this._dynamicFormsService.createFormControl(elem));
            });
            this._elements = elements;
            this._changeDetectorRef.detectChanges();
        }
    }

    get elements(): IDynamicElementConfig[] {
        return this._elements;
    }

    /**
     * Getter property for dynamic [FormGroup].
     */
    get form(): FormGroup {
        return this.dynamicForm;
    }

    /**
     * Getter property for [valid] of dynamic [FormGroup].
     */
    get valid(): boolean {
        if (this.dynamicForm) {
            return this.dynamicForm.valid;
        }
        return false;
    }

    /**
     * Getter property for [value] of dynamic [FormGroup].
     */
    get value(): any {
        if (this.dynamicForm) {
            return this.dynamicForm.value;
        }
        return {};
    }

    /**
     * Getter property for [errors] of dynamic [FormGroup].
     */
    get errors(): { [name: string]: any } {
        if (this.dynamicForm) {
            let errors: { [name: string]: any } = {};
            for (let name in this.dynamicForm.controls) {
                errors[name] = this.dynamicForm.controls[name].errors;
            }
            return errors;
        }
        return {};
    }

    /**
     * Getter property for [controls] of dynamic [FormGroup].
     */
    get controls(): { [key: string]: AbstractControl } {
        if (this.dynamicForm) {
            return this.dynamicForm.controls;
        }
        return {};
    }

    constructor(private _formBuilder: FormBuilder,
                private _dynamicFormsService: DynamicFormsService,
                private _changeDetectorRef: ChangeDetectorRef) {
        this.dynamicForm = this._formBuilder.group({});
    }
}
