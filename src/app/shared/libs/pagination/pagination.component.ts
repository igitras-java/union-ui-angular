import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from '../../model/page';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    _pageItems: PageItem[];

    _page: Page<any>;

    @Input() maxSize: number = 6;

    @Output() loadPage = new EventEmitter();

    @Input() set page(page: Page<any>) {
        this._page = page;
        this._pageItems = this.calculatePages(this._page.number, this._page.size, this._page.totalElements, this.maxSize);
    }

    viewPage(page: number) {
        if (page >= 0 && page <= this.getLastPage()) {
            this.loadPage.emit(page);
        }
    }

    isFirstPage(): boolean {
        return this._page.first;
    }

    isLastPage(): boolean {
        return this._page.last;
    }

    getLastPage(): number {
        return this._page.totalPages - 1;
    }


    constructor() {
    }

    ngOnInit() {

    }

    private calculatePages(currentPage: number, perPage: number, totalElements: number, maxSize: number): PageItem[] {
        if (currentPage === undefined) {
            return [];
        }

        if (totalElements === undefined) {
            return [];
        }

        let pages = [];
        const totalPages = Math.ceil(totalElements / perPage);
        const halfWay = Math.ceil(maxSize / 2);
        console.log("total: " + totalPages);
        console.log("half:" + halfWay);
        let startPage, endPage;
        if (totalPages <= maxSize) {
            startPage = 0;
            endPage = totalPages - 1;
        } else {
            if (currentPage < halfWay) {
                startPage = 0;
                endPage = maxSize - 1;
            } else if (currentPage + halfWay >= totalPages) {
                startPage = totalPages - maxSize;
                endPage = totalPages - 1;
            } else {
                startPage = currentPage - halfWay + 1;
                endPage = currentPage + (maxSize - halfWay);
            }
        }

        console.log(startPage);
        console.log(endPage);

        let i = startPage;
        while (i <= endPage) {
            let label = i + 1;
            let pageNumber = i;

            pages.push({
                label: label,
                value: pageNumber
            });
            console.log({
                label: label,
                value: pageNumber
            });
            i++;
        }

        if (pages.length > 0 && pages[0].value != 0) {
            pages[0].label = '...';
        }

        if (pages.length > 0 && pages[pages.length - 1].value != totalPages - 1) {
            pages[pages.length - 1].label = '...';
        }

        return pages;
    }
}

export interface PageItem {
    label: string;
    value: number;
}
