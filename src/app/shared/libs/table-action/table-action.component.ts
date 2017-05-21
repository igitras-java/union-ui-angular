import { Component, EventEmitter, Output } from '@angular/core';
import { SearchOption } from '../search/search.component';

@Component({
    selector: 'app-table-action',
    templateUrl: './table-action.component.html',
    styleUrls: ['./table-action.component.scss']
})
export class TableActionComponent {

    searchFields: SearchOption[] = [
        <SearchOption> {
            name: 'mason',
            title: "候选人"
        },
        <SearchOption> {
            name: 'cat',
            title: "毛"
        }
    ];

    @Output() searchFunction = new EventEmitter<SearchOption>();
    @Output() addFunction = new EventEmitter<any>();

    add($event): void {
        this.addFunction.emit($event);
    }

    search($event: SearchOption): void {
        this.searchFunction.emit($event);
    }
}
