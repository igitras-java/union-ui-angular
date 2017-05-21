export interface IPage {
    numberOfElements: number;
    first: boolean;
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    content: any[];
    sort: ISort;
}

export interface IPageable {
    pageNumber: number;
    pageSize: number;
    sort: ISort;
}

export interface ISort {
    orders: IOrder[];
}

export interface IOrder {
    direction: Direction;
    property: string;
}

export enum Direction {
    Ascending = <any>'ASC',
    Descending = <any>'DESC',
}