import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MdAutocompleteModule, MdChipsModule, MdIconModule, MdInputModule } from '@angular/material';

import { ChipsComponent } from './chips.component';
export { ChipsComponent } from './chips.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MdInputModule,
        MdIconModule,
        MdChipsModule,
        MdAutocompleteModule,
    ],
    declarations: [
        ChipsComponent,
    ],
    exports: [
        ChipsComponent,
    ],
})
export class IgChipsModule {

}
