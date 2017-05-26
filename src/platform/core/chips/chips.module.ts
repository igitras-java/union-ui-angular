import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MdAutocompleteModule, MdChipsModule, MdIconModule, MdInputModule } from '@angular/material';

import { IgChipsComponent } from './chips.component';

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
        IgChipsComponent,
    ],
    exports: [
        IgChipsComponent,
    ],
})
export class IgChipsModule {

}
