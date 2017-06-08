import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { IFieldDescriptor, IModelType } from '@igitras/core';

@Component({
    /* tslint:disable-next-line */
    selector: 'td[ig-data-table-cell]',
    styleUrls: ['./data-table-cell.component.scss'],
    templateUrl: './data-table-cell.component.html',
})
export class DataTableCellComponent {

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
     * numeric?: boolean
     * Makes cell follow the numeric data-table specs.
     * Defaults to 'false'
     */
    numeric: boolean = false;

    @HostBinding('class.mat-numeric')
    get bindNumeric(): boolean {
        return this.numeric;
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._renderer.addClass(this._elementRef.nativeElement, 'ig-data-table-cell');
    }

    private apply(fd: IFieldDescriptor): void {
        if (fd === null || fd === undefined) {
            return;
        }
        this.numeric = fd.type == IModelType.Number
    }
}
