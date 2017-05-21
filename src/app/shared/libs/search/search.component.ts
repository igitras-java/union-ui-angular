import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MdInputDirective } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [
        trigger('searchState', [
            state('hide-left', style({
                transform: 'translateX(-150%)',
                display: 'none',
            })),
            state('hide-right', style({
                transform: 'translateX(150%)',
                display: 'none',
            })),
            state('show', style({
                transform: 'translateX(0%)',
                display: 'block',
            })),
            transition('* => show', animate('200ms ease-in')),
            transition('show => *', animate('200ms ease-out')),
        ]),
    ],
})
export class SearchComponent {
    @ViewChild(MdInputDirective) _input: MdInputDirective;

    searching: boolean = false;
    value: string;
    _value: string;

    _searchItem: SearchOption;

    _searchFields: SearchOption[] = [];

    @Input()
    set searchFields(options: SearchOption[]) {
        this._searchFields = options.map(option => {
            return <SearchOption>{
                name: option.name,
                title: option.title ? option.title : option.name
            }
        }).slice();
    }

    @Input() placeholder: string;
    @Input() showUnderline: boolean = true;
    @Input() debounce: number = 1;

    @Output() onSearch: EventEmitter<SearchOption> = new EventEmitter<SearchOption>();

    focus(): void {
        this._input.focus();
        this._input._ngControl.valueChanges
            .skip(1)
            .debounceTime(this.debounce)
            .subscribe((value: string) => {
                if (this._searchItem != null) {
                    this.value = "";
                    this._value = ""
                } else {
                    this._value = value.trim();
                }
            });
    }

    blur(): void {
        console.log(this.value);
        if ((this.value == null || this.value == "") && (this._searchItem == null)) {
            this.clearSearch();
        }
    }

    handleSearch(): void {
        console.log(this._searchItem);
        if (this._searchItem == null) {
            this.onSearch.emit(<SearchOption>{
                name: '',
                title: '',
                value: ''
            });
        }
        this.onSearch.emit(this._searchItem);

    }

    handleBackspace(): void {
        if (this._value == null || this._value == "") {
            this._searchItem = null;
        }
        this._input.focus();
    }

    selectField(item: SearchOption) {
        if (this._value != null && this._value.trim().length > 0) {
            this._searchItem = <SearchOption> {
                name: item.name,
                title: item.title,
                value: this._value
            };
        }
        this.value = "";
        this._input.focus();
    }

    clearSearch(): void {
        this.value = '';
        this.toggleSearching();
    }

    toggleSearching(): void {
        this.searching = !this.searching;
    }

}

export interface SearchOption {
    name: string;
    title: string;
    value: string;
}