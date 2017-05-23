import { Exclude, Type } from 'class-transformer';
import { IOrder, IPage } from '@igitras/core';

export class Page<T> implements IPage {
    sort: IOrder[];
    numberOfElements: number = 0;
    first: boolean = true;
    number: number = 0;
    size: number = 10;
    totalPages: number = 1;
    totalElements: number = 0;
    last: boolean = true;
    @Type(options => (options.newObject as Page<T>).type)
    content: T[] = [];

    @Exclude()
    private type: Function;

    constructor(type: Function) {
        this.type = type;
    }
}

export class Dumy {
}