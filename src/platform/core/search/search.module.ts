import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdButtonModule, MdChipsModule, MdIconModule, MdInputModule } from '@angular/material';
import { IgCommonModule } from '@igitras/core';

export { ISearchItem, SearchComponent } from './search.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MdInputModule,
        MdIconModule,
        MdChipsModule,
        MdAutocompleteModule,
        MdButtonModule,
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
