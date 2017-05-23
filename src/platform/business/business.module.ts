import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule
} from '@angular/material';

import { IgCommonModule, IgDataTableModule } from '@igitras/core';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdInputModule,
        MdSelectModule,
        MdCheckboxModule,
        MdSliderModule,
        MdSlideToggleModule,
        IgCommonModule,
        IgDataTableModule
    ],
    declarations: [],
    exports: [],
    providers: [],
    entryComponents: [],
})
export class IgBusinessModule {

}
