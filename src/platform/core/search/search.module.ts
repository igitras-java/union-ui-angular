import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdChipsModule, MdIconModule, MdInputModule } from '@angular/material';
import { IgCommonModule } from '@igitras/core';

export { ISearchItem } from './search.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MdInputModule,
        MdIconModule,
        MdChipsModule,
        MdAutocompleteModule,
        IgCommonModule
    ],
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ]
})
export class IgSearchModule {
}
