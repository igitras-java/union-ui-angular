import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { Direction, IDecoratorType, IFieldDescriptor, IFieldTableDecorator, IModelType } from '@igitras/core';

export interface IDataTableSortChangedEvent {
    order: Direction;
    name: string;
}

@Component({
    /* tslint:disable-next-line */
    selector: 'th[ig-data-table-column]',
    styleUrls: ['./data-table-column.component.scss'],
    templateUrl: './data-table-column.component.html',
})
export class DataTableColumnComponent {

    private _sortOrder: Direction = Direction.Ascending;

    private _fd: IFieldDescriptor;
    /**
     * fd: IFieldDescriptor
     *
     * Field Description for column render of table.
     */
    @Input('fd')
    set fd(fd: IFieldDescriptor) {
        this._fd = fd;
        this.apply(fd);
    }

    get fd(): IFieldDescriptor {
        return this._fd;
    }

    /**
     * name?: string
     * Sets unique column [name] for [sortable] events.
     */
    name: string = '';

    /**
     * sortable?: boolean
     * Enables sorting events, sort icons and active column states.
     * Defaults to 'false'
     */
    sortable: boolean = false;

    /**
     * active?: boolean
     * Sets column to active state when 'true'.
     * Defaults to 'false'
     */
    @Input('active') active: boolean = false;

    /**
     * numeric?: boolean
     * Makes column follow the numeric data-table specs and sort icon.
     * Defaults to 'false'
     */
    numeric: boolean = false;

    /**
     * sortOrder?: ['ASC' | 'DESC'] or Direction
     * Sets the sort order of column.
     * Defaults to 'ASC' or Direction.Ascending
     */
    @Input('sortOrder')
    set sortOrder(order: 'ASC' | 'DESC') {
        let sortOrder: string = order ? order.toUpperCase() : 'ASC';
        if (sortOrder !== 'DESC' && sortOrder !== 'ASC') {
            throw new Error('[sortOrder] must be empty, ASC or DESC');
        }

        this._sortOrder = sortOrder === 'ASC' ?
            Direction.Ascending : Direction.Descending;
    }

    /**
     * sortChange?: function
     * Event emitted when the column headers are clicked. [sortable] needs to be enabled.
     * Emits an [IDataTableSortChangedEvent] implemented object.
     */
    @Output('sortChange') onSortChange: EventEmitter<IDataTableSortChangedEvent> =
        new EventEmitter<IDataTableSortChangedEvent>();

    @HostBinding('class.mat-clickable')
    get bindClickable(): boolean {
        return this.sortable;
    }

    @HostBinding('class.mat-sortable')
    get bingSortable(): boolean {
        return this.sortable;
    }

    @HostBinding('class.mat-active')
    get bindActive(): boolean {
        return this.active;
    }

    @HostBinding('class.mat-numeric')
    get bindNumeric(): boolean {
        return this.numeric;
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._renderer.addClass(this._elementRef.nativeElement, 'ig-data-table-column');
    }

    handleSortBy(): void {
        this.onSortChange.emit({name: this.name, order: this._sortOrder});
    }

    isAscending(): boolean {
        return this._sortOrder === Direction.Ascending;
    }

    isDescending(): boolean {
        return this._sortOrder === Direction.Descending;
    }

    private apply(fd: IFieldDescriptor): void {
        if (fd === null || fd === undefined) {
            return;
        }
        this.name = fd.name;
        this.numeric = fd.type == IModelType.Number
        let find: IFieldTableDecorator = this.fd.decorators.find(decorator => decorator.type === IDecoratorType.Table);
        if (find) {
            this.sortable = find.sortable;
        }
    }

}
