import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
    /* tslint:disable-next-line */
    selector: 'tr[data-table-row]',
    styleUrls: ['./data-table-row.component.scss'],
    templateUrl: './data-table-row.component.html',
})
export class DataTableRowComponent {

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._renderer.addClass(this._elementRef.nativeElement, 'data-table-row');
    }

    focus(): void {
        this._elementRef.nativeElement.focus();
    }

}
