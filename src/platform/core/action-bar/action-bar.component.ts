import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ICommand, IFieldDescriptor, ISearchItem, SearchComponent } from '@igitras/core';

@Component({
    selector: 'ig-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
})
export class IgActionBarComponent {

    @ViewChild(SearchComponent) _search: SearchComponent;

    private _columns: IFieldDescriptor[] = [];
    private _iconActions: ICommand[] = [];
    private _btnActions: ICommand[] = [];
    searching: boolean = false;

    @Input("placeholder") placeholder: string = 'Search';
    @Input("enableSearch") enableSearch: boolean = true;
    @Input("enableSetting") enableSetting: boolean = false;

    @Input("tableActions")
    set tableActions(actions: ICommand[]) {
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

    iconActions(): ICommand[] {
        return this._iconActions;
    }

    buttonActions(): ICommand[] {
        return this._btnActions;
    }

    @Output("onPerformAction") onPerformAction: EventEmitter<ICommand> = new EventEmitter<ICommand>();
    @Output("onSearch") onSearch: EventEmitter<ISearchItem[] | string>
        = new EventEmitter<ISearchItem[] | string>();

    constructor() {
    }

    performAction(action: ICommand) {
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
