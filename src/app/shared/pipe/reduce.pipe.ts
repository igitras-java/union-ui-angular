import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
    name: 'reduce'
})
export class ReducePipe implements PipeTransform {

    transform(value: any[], reducer: any[]): any {
        if (isNullOrUndefined(reducer)) {
            return value;
        }

        return value.filter(v => reducer.indexOf(v) >= 0);
    }

}
