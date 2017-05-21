import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Dir } from '@angular/material';
import { IPage, IPageable } from '@igitras/core';

export interface IPageChangeEvent {
    pageable: IPageable
    fromRow: number;
    toRow: number;
}

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    private _pageSizes: number[] = [10, 15, 20, 50, 100];

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

    private _fromRow: number = 1;
    private _toRow: number = 1;
    private _pageLinks: number[] = [];
    private _pageLinkCount: number = 5;
    private _id: string;

    // special case when 2 pageLinks, detect when hit end of pages so can lead in correct direction
    private _hitEnd: boolean = false;
    // special case when 2 pageLinks, detect when hit start of pages so can lead in correct direction
    private _hitStart: boolean = false;

    /**
     * pageSizeAll?: boolean
     * Shows or hides the 'all' menu item in the page size menu. Defaults to 'false'
     */
    @Input('pageSizeAll') pageSizeAll: boolean = false;

    /**
     * pageSizeAllText?: string
     * Text for the 'all' menu item in the page size menu. Defaults to 'All'
     */
    @Input('pageSizeAllText') pageSizeAllText: string = 'All';

    /**
     * firstLast?: boolean
     * Shows or hides the first and last page buttons of the paging bar. Defaults to 'false'
     */
    @Input('firstLast') firstLast: boolean = true;

    /**
     * pageLinkCount?: number
     * Amount of page jump to links for the paging bar. Defaults to '0'
     */
    @Input('pageLinkCount')
    set pageLinkCount(pageLinkCount: number) {
        this._pageLinkCount = pageLinkCount;
        this._calculatePageLinks();
    }

    get pageLinkCount(): number {
        return this._pageLinkCount;
    }

    /**
     * pageSizes?: number[]
     * Array that populates page size menu. Defaults to [50, 100, 200, 500, 1000]
     */
    @Input('pageSizes')
    set pageSizes(pageSizes: number[]) {
        if (!(pageSizes instanceof Array)) {
            throw new Error('[pageSizes] needs to be an number array.');
        }
        this._pageSizes = pageSizes;
        this._page.size = this._pageSizes[0];
    }

    get pageSizes(): number[] {
        return this._pageSizes;
    }

    /**
     * pageSize?: number
     * Selected page size for the pagination. Defaults to first element of the [pageSizes] array.
     */
    @Input('pageSize')
    set pageSize(pageSize: number) {
        if ((this._pageSizes.indexOf(pageSize) > -1 || this._page.totalElements === pageSize) && this._page.size !== pageSize) {
            this._page.size = pageSize;
            this._page.number = 0;
            this._page.totalPages = Math.ceil(this._page.totalElements / this._page.size);
            this._handleOnChange();
        }
    }

    get pageSize(): number {
        return this._page.size;
    }

    @Input('page')
    set page(page: IPage) {
        this._page = page;
        this._calculateRows();
        this._calculatePageLinks();
    }

    get page(): IPage {
        return this._page;
    }

    /**
     * pageLinks: number[]
     * Returns the pageLinks in an array
     */
    get pageLinks(): number[] {
        return this._pageLinks;
    }

    /**
     * range: string
     * Returns the range of the rows.
     */
    get range(): string {
        return `${!this._toRow ? 0 : this._fromRow}-${this._toRow}`;
    }

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
    @Output('change') onChange: EventEmitter<IPageChangeEvent> = new EventEmitter<IPageChangeEvent>();

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
        this._calculateRows();
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
     * firstPage?: function
     * Navigates to the first page. Returns 'true' if page is valid, else 'false'.
     */
    firstPage(): boolean {
        return this.navigateToPage(0);
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

    /**
     * lastPage?: function
     * Navigates to the last page. Returns 'true' if page is valid, else 'false'.
     */
    lastPage(): boolean {
        return this.navigateToPage(this.maxPage - 1);
    }

    isMinPage(): boolean {
        return this._page.number <= 0;
    }

    isMaxPage(): boolean {
        return this._page.number >= this._page.totalPages - 1;
    }

    private _calculateRows(): void {
        let top: number = (this._page.number + 1) * this._page.size;
        this._fromRow = this._page.size * this._page.number + 1;
        this._toRow = this._page.totalElements > top ? top : this._page.totalElements;
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
        // If the pageLinkCount goes above max possible pages based on perpage setting then reset it to maxPage
        let actualPageLinkCount: number = this.pageLinkCount;
        if (this.pageLinkCount > this.maxPage) {
            actualPageLinkCount = this.maxPage;
        }
        // reset the pageLinks array
        this._pageLinks = [];
        // fill in the array with the pageLinks based on the current selected page
        let middlePageLinks: number = Math.floor(actualPageLinkCount / 2);
        for (let x: number = 0; x < actualPageLinkCount; x++) {
            // don't go past the maxPage in the pageLinks
            // have to handle even and odd pageLinkCounts differently so can still lead to the next numbers
            if ((actualPageLinkCount % 2 === 0 && (this._page.number + middlePageLinks > this.maxPage)) ||
                (actualPageLinkCount % 2 !== 0 && (this._page.number + middlePageLinks >= this.maxPage))) {
                this._pageLinks[x] = this.maxPage - (actualPageLinkCount - (x));
                // if the selected page is after the middle then set that page as middle and get the correct balance on left and right
                // special handling when there are only 2 pageLinks to just drop to next if block so can lead to next numbers when moving to right
                // when moving to the left then go into this block
            } else if ((actualPageLinkCount > 2 || actualPageLinkCount <= 2 && this._hitEnd) && (this._page.number - middlePageLinks) > 0) {
                this._pageLinks[x] = (this._page.number - middlePageLinks) + x;
                // if the selected page is before the middle then set the pages based on the x index leading up to and after selected page
            } else if ((this._page.number - middlePageLinks) <= 0) {
                this._pageLinks[x] = x;
                // other wise just set the array in order starting from the selected page
            } else {
                this._pageLinks[x] = this._page.number + x;
            }
        }
    }

    private _handleOnChange(): void {
        this._calculateRows();
        this._calculatePageLinks();
        let event: IPageChangeEvent = {
            pageable: <IPageable>{
                pageNumber: this._page.number,
                pageSize: this._page.size,
                sort: this._page.sort
            },
            fromRow: this._fromRow,
            toRow: this._toRow,
        };
        this.onChange.emit(event);
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
