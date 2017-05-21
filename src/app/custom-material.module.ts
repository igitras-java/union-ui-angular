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
    MdInputModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSelectModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';
import { IgCommonModule, IgDataTableModule, IgPagingModule, IgSearchModule } from '@igitras/core';

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

        IgCommonModule,
        IgDataTableModule,
        IgPagingModule,
        IgSearchModule
    ]
})
export class CustomMaterialModule {
}
