import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IAction, IFieldDescriptor, ISearchItem, SearchComponent } from '@igitras/core';

@Component({
    selector: 'ig-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
})
export class IgActionBarComponent {

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

    @Output("onPerformAction") onPerformAction: EventEmitter<IAction> = new EventEmitter<IAction>();
    @Output("onSearch") onSearch: EventEmitter<ISearchItem[] | string>
        = new EventEmitter<ISearchItem[] | string>();

    constructor() {
    }

    performAction(action: IAction) {
        this.onPerformAction.emit(action);
    }

    performSearch(searchItems: ISearchItem[] | string) {
        this.onSearch.emit(searchItems);
    }

    cancelSearch($event: any) {
        this.searching = false;
    }

    startSearch() {
        this.searching = true;
    }
}
