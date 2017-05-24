import {
    Component,
    DoCheck,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BACKSPACE, DELETE, ESCAPE, LEFT_ARROW, MdChip, MdInputDirective, RIGHT_ARROW } from '@angular/material';
import { IFieldDescriptor } from 'platform/core';
import { Focusable } from '@angular/material/typings/core/a11y/focus-key-manager';

const noop: any = () => {
    // empty method
};

export const SEARCH_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchComponent),
    multi: true,
};

export interface ISearchItem {
    field: IFieldDescriptor,
    value: string;
}

@Component({
    providers: [SEARCH_CONTROL_VALUE_ACCESSOR],
    selector: 'ig-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements Focusable, DoCheck, OnInit {
    /**
     * Implemented as part of ControlValueAccessor.
     */
    private _value: ISearchItem[] = [];
    private _items: IFieldDescriptor[] = [];
    private _length: number = 0;
    private _searchItemAddition: boolean = true;
    private _inputValue: string = '';
    private _inputValueSubscription;

    @ViewChild(MdInputDirective) _inputChild: MdInputDirective;
    @ViewChildren(MdChip) _searchItemsChildren: QueryList<MdChip>;

    /**
     * Flag that is true when autocomplete is focused.
     */
    focused: boolean = false;

    /**
     * FormControl for the mdInput element.
     */
    inputControl: FormControl = new FormControl();


    /**
     * Observable of items to render in the select auto complete.
     */
    filteredItems: IFieldDescriptor[] = [];

    /**
     * items?: IFieldDescriptor[]
     * Enables Autocompletion with the provided list of strings.
     */
    @Input('items')
    set items(items: IFieldDescriptor[]) {
        this._items = items;
        this._filter();
    }

    get items(): IFieldDescriptor[] {
        return this._items;
    }

    /**
     * searchItemAddition?: boolean
     * Disables the ability to add chips. If it doesn't exist chip addition defaults to true.
     */
    @Input('searchItemAddition')
    set searchItemAddition(searchItemAddition: boolean) {
        this._searchItemAddition = searchItemAddition;
        this._toggleInput();
    }

    get searchItemAddition(): boolean {
        return this._searchItemAddition;
    }

    /**
     * placeholder?: string
     * Placeholder for the autocomplete input.
     */
    @Input('placeholder') placeholder: string;

    /**
     * search?: function
     * Method to be executed when seach .
     * Sends value as event.
     */
    @Output('search') search: EventEmitter<ISearchItem[] | string> = new EventEmitter<ISearchItem[] | string>();

    @Output('cancel') cancel: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Implemented as part of ControlValueAccessor.
     */
    @Input() set value(value: ISearchItem[]) {
        if (value !== this._value) {
            this._value = value;
            this._length = this._value ? this._value.length : 0;
            this._filter();
        }
    }

    get value(): ISearchItem[] {
        return this._value;
    }

    ngOnInit() {
        this.focused = true;
    }

    ngDoCheck(): void {
        // Throw onNavigate event only if array changes size.
        if (this._value && this._value.length !== this._length) {
            this._length = this._value.length;
            this.onChange(this._value);
        }
    }

    /**
     * Returns a list of filtered items.
     */
    private _filter(): void {
        const selectedFields: IFieldDescriptor[] = this._value.map(item => item.field).concat([]);
        console.log(selectedFields);
        this.filteredItems = this.items
            .filter((item: IFieldDescriptor) => {
                return item.searchable ? item.searchable : false;
            })
            .filter((item: IFieldDescriptor) => {
                return selectedFields.indexOf(item) <= -1;
            });
    }

    /**
     * Method that is executed when trying to create a new chip from the autocomplete.
     * returns 'true' if successful, 'false' if it fails.
     */
    addSearchItem(item: IFieldDescriptor): boolean {
        if (this._inputValue === undefined) {
            return false;
        }
        const _value = this._inputValue.trim();
        this._inputValueSubscription.unsubscribe();
        let result = false;

        if (item) {
            if (_value !== '') {
                this._value.push(<ISearchItem>{
                    field: item,
                    value: _value
                });
                this.onChange(this._value);
                this.inputControl.setValue('');
                this._filter();
                result = true;
            }
        } else {
            if (_value !== '') {
                this._value.push(<ISearchItem>{
                    field: null,
                    value: _value
                });
                this.handleSearch();
                this.inputControl.setValue('');
                result = true;
            }
        }
        this._inputChild.focus();
        return result;
    }

    /**
     * Method that is executed when trying to remove a chip.
     * returns 'true' if successful, 'false' if it fails.
     */
    removeSearchItem(value: ISearchItem): boolean {
        let index: number = this._value.indexOf(value);
        if (index < 0) {
            return false;
        }
        this._value.splice(index, 1);
        this.onChange(this._value);
        this.inputControl.setValue('');
        this._filter();
        return true;
    }

    handleSearch(): void {
        console.log("handle search");
        if (this.value && this.value.length > 0) {
            this.search.emit(this.value);
        } else {
            this.search.emit(this._inputValue);
        }
        console.log("handle search2")
    }

    handleCancelled(): void {
        console.log("cancelled search");
        this._value = [];
        this._filter();
        this.cancel.emit();
    }

    handleFocus(): boolean {
        if (!this._inputValueSubscription) {
            this._inputValueSubscription = this.inputControl.valueChanges
                .skip(1)
                .debounceTime(50);
        }
        this._inputValueSubscription
            .subscribe((value: string) => {
                this._inputValue = value;
                console.log(this._inputValue);
            });
        this.focused = true;
        return true;
    }

    handleBlur(): boolean {
        this.focused = false;
        this.onTouched();
        return true;
    }

    /**
     * Programmatically focus the input. Since its the component entry point
     */
    focus(): void {
        if (this.searchItemAddition) {
            this._inputChild.focus();
        }
    }

    /**
     * Passes relevant input key presses.
     */
    _inputKeydown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case LEFT_ARROW:
            case DELETE:
            case BACKSPACE:
                /** Check to see if input is empty when pressing left arrow to move to the last chip */
                if (!this._inputChild.value) {
                    this._focusLastSearchItem();
                    event.preventDefault();
                }
                break;
            case RIGHT_ARROW:
                /** Check to see if input is empty when pressing right arrow to move to the first chip */
                if (!this._inputChild.value) {
                    this._focusFirstSearchItem();
                    event.preventDefault();
                }
                break;
            default:
            // default
        }
    }

    /**
     * Passes relevant chip key presses.
     */
    _chipKeydown(event: KeyboardEvent, index: number): void {
        switch (event.keyCode) {
            case DELETE:
            case BACKSPACE:
                /**
                 * Checks if deleting last single chip, to focus input afterwards
                 * Else check if its not the last chip of the list to focus the next one.
                 */
                if (index === (this._totalSearchItems - 1) && index === 0) {
                    this.focus();
                } else if (index < (this._totalSearchItems - 1)) {
                    this._focusSearchItem(index + 1);
                }
                this.removeSearchItem(this.value[index]);
                break;
            case LEFT_ARROW:
                /**
                 * Check to see if left arrow was pressed while focusing the first chip to focus input next
                 * Also check if input should be focused
                 */
                if (index === 0 && this.searchItemAddition) {
                    this.focus();
                    event.stopPropagation();
                }
                break;
            case RIGHT_ARROW:
                /**
                 * Check to see if right arrow was pressed while focusing the last chip to focus input next
                 * Also check if input should be focused
                 */
                if (index === (this._totalSearchItems - 1) && this.searchItemAddition) {
                    this.focus();
                    event.stopPropagation();
                }
                break;
            case ESCAPE:
                this.focus();
                break;
            default:
            // default
        }
    }

    onChange = (_: any) => noop;
    onTouched = () => noop;

    /**
     * Get total of search items
     */
    private get _totalSearchItems(): number {
        let searchItems: MdChip[] = this._searchItemsChildren.toArray();
        return searchItems.length;
    }

    /**
     * Method to focus a desired chip by index
     */
    private _focusSearchItem(index: number): void {
        /** check to see if index exists in the array before focusing */
        if (index > -1 && this._totalSearchItems > index) {
            this._searchItemsChildren.toArray()[index].focus();
        }
    }

    /** Method to focus first search item chip */
    private _focusFirstSearchItem(): void {
        this._focusSearchItem(0);
    }

    /** Method to focus last search item chip */
    private _focusLastSearchItem(): void {
        this._focusSearchItem(this._totalSearchItems - 1);
    }

    /**
     * Method to toggle the disable state of input
     */
    private _toggleInput(): void {
        if (this.searchItemAddition) {
            this.inputControl.enable();
        } else {
            this.inputControl.disable();
        }
    }

}
