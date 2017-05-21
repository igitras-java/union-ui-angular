import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule
} from '@angular/material';

import { IgCommonModule } from '../core';

import { DynamicFormsComponent } from './dynamic-forms.component';
import { DynamicElementComponent, DynamicElementDirective } from './dynamic-element.component';
import { DynamicFormsService } from './services/dynamic-forms.service';

import { DynamicInputComponent } from './dynamic-elements/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from './dynamic-elements/dynamic-textarea/dynamic-textarea.component';
import { DynamicSlideToggleComponent } from './dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component';
import { DynamicCheckboxComponent } from './dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicSliderComponent } from './dynamic-elements/dynamic-slider/dynamic-slider.component';
import { DynamicSelectComponent } from './dynamic-elements/dynamic-select/dynamic-select.component';

const DYNAMIC_FORMS: Type<any>[] = [
    DynamicFormsComponent,
    DynamicElementComponent,
    DynamicElementDirective,
];

const DYNAMIC_FORMS_ENTRY_COMPONENTS: Type<any>[] = [
    DynamicInputComponent,
    DynamicTextareaComponent,
    DynamicSlideToggleComponent,
    DynamicCheckboxComponent,
    DynamicSliderComponent,
    DynamicSelectComponent,
];

@NgModule({
    declarations: [
        DYNAMIC_FORMS,
        DYNAMIC_FORMS_ENTRY_COMPONENTS,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdInputModule,
        MdSelectModule,
        MdCheckboxModule,
        MdSliderModule,
        MdSlideToggleModule,
        IgCommonModule,
    ],
    exports: [
        DYNAMIC_FORMS,
        DYNAMIC_FORMS_ENTRY_COMPONENTS,
    ],
    providers: [
        DynamicFormsService,
    ],
    entryComponents: [
        DYNAMIC_FORMS_ENTRY_COMPONENTS
    ],
})
export class IgDynamicFormsModule {

}
