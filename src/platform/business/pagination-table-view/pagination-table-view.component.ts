import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    ICommand,
    ICommandPerformedEvent,
    IEventContext,
    IDataTableRowAction,
    IDataTableRowActionPerformedEvent,
    IDataTableRowClickedEvent,
    IDataTableSortChangedEvent,
    IFieldDescriptor,
    IPage,
    IPageChangeEvent,
    ISearchItem
} from '@igitras/core';

@Component({
    selector: 'ig-pagination-table-view',
    templateUrl: './pagination-table-view.component.html',
    styleUrls: ['./pagination-table-view.component.scss']
})
export class PaginationTableViewComponent {

    @Input("title") title: string = '';

    @Input("placeholder") placeholder: string = 'Search';
    @Input("enableSearch") enableSearch: boolean = true;
    @Input("enableSetting") enableSetting: boolean = false;

    @Input("actions") actions: ICommand[] = [];
    @Input("rowActions") rowActions: IDataTableRowAction[] = [];

    @Input("fields") fields: IFieldDescriptor[] = [];

    @Input("pageData") pageData: IPage;

    @Input("rowSelectable") rowSelectable: boolean = false;
    @Input("multipleSelect") multipleSelect: boolean = true;
    @Input("rowClickable") rowClickable: boolean = false;

    @Output("onPerformAction") onPerformAction: EventEmitter<ICommandPerformedEvent>
        = new EventEmitter<ICommandPerformedEvent>();

    @Output("onSearch") onSearch: EventEmitter<ISearchItem[] | string> = new EventEmitter<ISearchItem[] | string>();

    @Output("onPerformRowAction") onPerformRowAction: EventEmitter<IDataTableRowActionPerformedEvent>
        = new EventEmitter<IDataTableRowActionPerformedEvent>();

    @Output("onRowClicked") onRowClicked: EventEmitter<IDataTableRowClickedEvent> =
        new EventEmitter<IDataTableRowClickedEvent>();

    @Output("onSortChanged") onSortChanged: EventEmitter<IDataTableSortChangedEvent>
        = new EventEmitter<IDataTableSortChangedEvent>();

    @Output("onPerformNavigate") onPerformNavigate: EventEmitter<IPageChangeEvent>
        = new EventEmitter<IPageChangeEvent>();

    selectedRows: any[] = [];

    content(): any[] {
        if (!this.pageData) {
            return [];
        }

        if (!this.pageData.content) {
            return [];
        }

        return this.pageData.content;
    }

    handlePerformedAction(action: ICommand) {
        this.onPerformAction.emit(<ICommandPerformedEvent>{
            action: action,
            context: <IEventContext>{
                content: this.selectedRows
            }
        });
    }

    handlePerformedSearch(search: ISearchItem[] | string) {
        console.log("handle search5")
        this.onSearch.emit(search);
        console.log("handle search6")
    }

    handlePerformedRowAction(rowActionPerformedEvent: IDataTableRowActionPerformedEvent) {
        this.onPerformRowAction.emit(rowActionPerformedEvent);
    }

    handleRowClickedAction(rowClickedEvent: IDataTableRowClickedEvent) {
        this.onRowClicked.emit(rowClickedEvent);
    }

    handleSortChangedAction(sortChangedEvent: IDataTableSortChangedEvent) {
        this.onSortChanged.emit(sortChangedEvent);
    }

    handleNavigateEvent(navigate: IPageChangeEvent) {
        this.onPerformNavigate.emit(navigate);
    }
}
