import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { IPage, IPageable, IPageChangeEvent } from '@igitras/core';
import { Dir } from '@angular/material';

@Component({
    selector: 'ig-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss']
})
export class IgPagerComponent implements OnInit {

    private _page: IPage = <IPage>{
        numberOfElements: 0,
        first: true,
        number: 0,
        size: 10,
        totalPages: 1,
        totalElements: 0,
        last: true,
        content: []
    };

    private _id: string;

    // special case when 2 pageLinks, detect when hit end of pages so can lead in correct direction
    private _hitEnd: boolean = false;
    // special case when 2 pageLinks, detect when hit start of pages so can lead in correct direction
    private _hitStart: boolean = false;

    @Input('page')
    set page(page: IPage) {
        this._page = page;
        this._calculatePageLinks();
    }

    get page(): IPage {
        return this._page;
    }

    @Input() showLabel: boolean = false;

    @Input() showLabelOnly: boolean = false;

    @Input() previousLabel: string;
    @Input() nextLabel: string;

    /**
     * page: number
     * Returns the max page for the current pageSize and total.
     */
    get maxPage(): number {
        return this._page.totalPages;
    }

    /**
     * id: string
     * Returns the guid id for this paginator
     */
    get id(): string {
        return this._id;
    }

    /**
     * change?: function
     * Method to be executed when page size changes or any button is clicked in the paging bar.
     * Emits an [IPageChangeEvent] implemented object.
     */
    @Output('navigate') onNavigate: EventEmitter<IPageChangeEvent> = new EventEmitter<IPageChangeEvent>();


    get isRTL(): boolean {
        if (this._dir) {
            return this._dir.dir === 'rtl';
        }
        return false;
    }

    constructor(@Optional() private _dir: Dir) {
        this._id = this.guid();
    }

    ngOnInit() {
        this._calculatePageLinks();
    }

    /**
     * navigateToPage?: function
     * Navigates to a specific valid page. Returns 'true' if page is valid, else 'false'.
     */
    navigateToPage(page: number): boolean {
        if (page == this._page.number) {
            return false;
        }
        if (page === 0 || (page >= 0 && page <= this.maxPage)) {
            this._page.number = page;
            this._handleOnChange();
            return true;
        }
        return false;
    }

    /**
     * prevPage?: function
     * Navigates to the previous page. Returns 'true' if page is valid, else 'false'.
     */
    prevPage(): boolean {
        return this.navigateToPage(this._page.number - 1);
    }

    /**
     * nextPage?: function
     * Navigates to the next page. Returns 'true' if page is valid, else 'false'.
     */
    nextPage(): boolean {
        return this.navigateToPage(this._page.number + 1);
    }

    isMinPage(): boolean {
        return this._page.number <= 0;
    }

    isMaxPage(): boolean {
        return this._page.number >= this._page.totalPages - 1;
    }

    /**
     * _calculatePageLinks?: function
     * Calculates the page links that should be shown to the user based on the current state of the paginator
     */
    private _calculatePageLinks(): void {
        // special case when 2 pageLinks, detect when hit end of pages so can lead in correct direction
        if (this.isMaxPage()) {
            this._hitEnd = true;
            this._hitStart = false;
        }
        // special case when 2 pageLinks, detect when hit start of pages so can lead in correct direction
        if (this.isMinPage()) {
            this._hitEnd = false;
            this._hitStart = true;
        }
    }

    private _handleOnChange(): void {
        this._calculatePageLinks();
        let event: IPageChangeEvent = {
            pageable: <IPageable>{
                pageNumber: this._page.number,
                pageSize: this._page.size,
                sort: this._page.sort
            }
        };
        this.onNavigate.emit(event);
    }

    /**
     * guid?: function
     * Returns RFC4122 random ("version 4") GUIDs
     */
    private guid(): string {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    private s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}
