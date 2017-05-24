import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationTableViewComponent } from './pagination-table-view.component';
import { IgActionBarModule, IgDataTableModule, IgPagingModule } from '@igitras/core';
import { MdCardModule, MdListModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdListModule,
        MdCardModule,
        IgActionBarModule,
        IgDataTableModule,
        IgPagingModule,
    ],
    declarations: [
        PaginationTableViewComponent
    ],
    exports: [
        PaginationTableViewComponent
    ]
})
export class IgPaginationTableViewModule {
}
