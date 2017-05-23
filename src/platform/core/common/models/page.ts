export interface IPage {
    numberOfElements: number;
    first: boolean;
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    content: any[];
    sort: IOrder[];
}

export interface IPageable {
    pageNumber: number;
    pageSize: number;
    sort: IOrder[];
}

export interface IOrder {
    direction: Direction;
    property: string;
}

export enum Direction {
    Ascending = <any>'ASC',
    Descending = <any>'DESC',
}