import { NgModule, Type } from '@angular/core';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdButtonModule, MdChipsModule, MdIconModule, MdInputModule } from '@angular/material';
import { IgCommonModule } from '@igitras/core';

export { ISearchItem, SearchComponent } from './search.component';

const DEP_MODULES: Type<any>[] = [
    IgCommonModule,
    ReactiveFormsModule,
    MdInputModule,
    MdIconModule,
    MdChipsModule,
    MdAutocompleteModule,
    MdButtonModule,
];

@NgModule({
    imports: [
        DEP_MODULES,
    ],
    declarations: [
        SearchComponent,
    ],
    exports: [
        DEP_MODULES,
        SearchComponent,
    ]
})
export class IgSearchModule {
}
