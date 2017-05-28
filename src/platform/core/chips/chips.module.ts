import { NgModule, Type } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MdAutocompleteModule, MdChipsModule, MdIconModule, MdInputModule } from '@angular/material';

import { IgChipsComponent } from './chips.component';
import { IgCommonModule } from '@igitras/core';

const DEP_MODULES: Type<any>[] = [
    IgCommonModule,
    ReactiveFormsModule,
    MdInputModule,
    MdIconModule,
    MdChipsModule,
    MdAutocompleteModule,
];
@NgModule({
    imports: [
        DEP_MODULES,
    ],
    declarations: [
        IgChipsComponent,
    ],
    exports: [
        DEP_MODULES,
        IgChipsComponent,
    ],
})
export class IgChipsModule {

}
