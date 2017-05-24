import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MdButtonModule,
    MdCheckboxModule,
    MdIconModule,
    MdListModule,
    MdSelectionModule,
    MdTooltipModule
} from '@angular/material';

import { IgCommonModule } from '@igitras/core';
import { DataTableTemplateDirective } from './directives/data-table-template.directive';
import { DataTableComponent } from './data-table.component';
import { DataTableColumnComponent } from './data-table-column/data-table-column.component';
import { DataTableCellComponent } from './data-table-cell/data-table-cell.component';
import { DataTableRowComponent } from './data-table-row/data-table-row.component';
import { DataTableTableComponent } from './data-table-table/data-table-table.component';
import { DataTableService } from './services/data-table.service';

const DATA_TABLE: Type<any>[] = [
    DataTableComponent,
    DataTableTemplateDirective,

    DataTableColumnComponent,
    DataTableCellComponent,
    DataTableRowComponent,
    DataTableTableComponent,
];

export {
    DataTableComponent,
    IDataTableRowClickedEvent,
    IDataTableRowAction,
    IDataTableSelectEvent,
    IDataTableSelectAllEvent,
    IDataTableRowActionPerformedEvent,
} from './data-table.component';

export { DataTableService } from './services/data-table.service';
export {
    DataTableColumnComponent,
    IDataTableSortChangedEvent
} from './data-table-column/data-table-column.component';
export { DataTableCellComponent } from './data-table-cell/data-table-cell.component';
export { DataTableRowComponent } from './data-table-row/data-table-row.component';
export { DataTableTableComponent } from './data-table-table/data-table-table.component';

const DEP_MODULES: Type<any>[] = [
    MdCheckboxModule,
    MdTooltipModule,
    MdIconModule,
    MdButtonModule,
    MdSelectionModule,
    MdListModule,
    IgCommonModule,
];


@NgModule({
    imports: [
        CommonModule,
        DEP_MODULES,
    ],
    declarations: [
        DATA_TABLE,
    ],
    exports: [
        DATA_TABLE,
    ],
    providers: [
        DataTableService,
    ],
})
export class IgDataTableModule {

}
