import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
    /* tslint:disable-next-line */
    selector: 'table[ig-data-table]',
    styleUrls: ['./data-table-table.component.scss'],
    templateUrl: './data-table-table.component.html',
})
export class DataTableTableComponent {

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._renderer.addClass(this._elementRef.nativeElement, 'ig-data-table');
    }

}
