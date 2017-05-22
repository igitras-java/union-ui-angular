import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { IFieldDescriptor, ISearchItem } from '@igitras/core';
import { SearchComponent } from '@igitras/core';
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
    searching: boolean = false;

    @Input() placeholder: string = 'Search';

    @Input()
    set columns(columns: IFieldDescriptor[]) {
        this._columns = columns;
        console.log(columns);
    }

    get columns(): IFieldDescriptor[] {
        return this._columns;
    }

    constructor() {
    }

    ngOnInit() {
    }

    print() {
        console.log(this._columns);
    }

    performSearch(searchItems: ISearchItem[] | string) {
        console.log(searchItems)
    }

    cancelSearch($event: any) {
        console.log("cancelled");
        this.searching = false;
        console.log(this._search);
    }

    startSearch() {
        this.searching = true;
        console.log(this._search);
    }

}