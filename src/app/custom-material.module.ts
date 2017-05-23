import { NgModule } from '@angular/core';
import {
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule, MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSelectModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';
import { IgActionBarModule, IgCommonModule, IgDataTableModule, IgPagingModule, IgSearchModule } from '@igitras/core';

@NgModule({
    imports: [
        MdCoreModule,
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        MdIconModule,
        MdInputModule,
        MdMenuModule,
        MdProgressBarModule,
        MdSelectModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule,
        MdDialogModule,
        MdAutocompleteModule,
        MdListModule,

        IgActionBarModule,
        IgCommonModule,
        IgDataTableModule,
        IgPagingModule,
        IgSearchModule
    ],
    exports: [
        MdCoreModule,
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdChipsModule,
        MdIconModule,
        MdInputModule,
        MdMenuModule,
        MdProgressBarModule,
        MdSelectModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule,
        MdDialogModule,
        MdAutocompleteModule,
        MdListModule,

        IgCommonModule,
        IgDataTableModule,
        IgActionBarModule,
        IgPagingModule,
        IgSearchModule
    ]
})
export class CustomMaterialModule {
}
