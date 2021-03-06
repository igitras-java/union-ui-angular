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
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSelectModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';
import {
    IgActionBarModule, IgCommonModule, IgDataTableModule, IgDialogsModule, IgPagingModule,
    IgSearchModule
} from '@igitras/core';
import { IgPaginationTableViewModule } from '@igitras/business';

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

        IgCommonModule,
        IgDataTableModule,
        IgDialogsModule,
        IgSearchModule,
        IgActionBarModule,
        IgPaginationTableViewModule,
        IgPagingModule,
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
        IgDialogsModule,
        IgSearchModule,
        IgActionBarModule,
        IgPaginationTableViewModule,
        IgPagingModule,
    ]
})
export class CustomMaterialModule {
}
