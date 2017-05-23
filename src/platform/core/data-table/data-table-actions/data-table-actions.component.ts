import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { IAction, IFieldDescriptor, ISearchItem, SearchComponent } from '@igitras/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const TABLE_ACTIONS_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataTableActionsComponent),
    multi: true,
};


@Component({
    providers: [TABLE_ACTIONS_CONTROL_VALUE_ACCESSOR],
    selector: 'data-table-actions',
    styleUrls: ['data-table-actions.component.scss'],
    templateUrl: 'data-table-actions.component.html'
})
export class DataTableActionsComponent {

    @ViewChild(SearchComponent) _search: SearchComponent;

    private _columns: IFieldDescriptor[] = [];
    private _iconActions: IAction[] = [];
    private _btnActions: IAction[] = [];
    searching: boolean = false;

    @Input("placeholder") placeholder: string = 'Search';
    @Input("enableSearch") enableSearch: boolean = true;
    @Input("enableSetting") enableSetting: boolean = false;

    @Input("tableActions")
    set tableActions(actions: IAction[]) {
        this._iconActions = actions.filter((action) => !!action.icon);
        this._btnActions = actions.filter((action) => !action.icon);
    }

    @Input()
    set columns(columns: IFieldDescriptor[]) {
        this._columns = columns;
    }

    get columns(): IFieldDescriptor[] {
        return this._columns;
    }

    iconActions(): IAction[] {
        return this._iconActions;
    }

    buttonActions(): IAction[] {
        return this._btnActions;
    }

    @Output("tableAction") onTableAction: EventEmitter<IAction> = new EventEmitter<IAction>();
    @Output("searchAction") onSearchAction: EventEmitter<ISearchItem[] | string> = new EventEmitter<ISearchItem[] | string>();

    constructor() {
    }

    performAction(action: IAction) {
        this.onTableAction.emit(action);
    }

    performSearch(searchItems: ISearchItem[] | string) {
        this.onSearchAction.emit(searchItems);
        console.log(searchItems);
    }

    cancelSearch($event: any) {
        this.searching = false;
    }

    startSearch() {
        this.searching = true;
    }

}