import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdOptionModule, MdSelectModule } from '@angular/material';
import { IgCommonModule } from '@igitras/core';

export { IPageChangeEvent } from './pagination/pagination.component';

const DEP_MODULES: Type<any>[] = [
    MdIconModule,
    MdSelectModule,
    MdButtonModule,
    MdOptionModule,
    IgCommonModule
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DEP_MODULES,
    ],
    declarations: [
        PagerComponent,
        PaginationComponent
    ],
    exports: [
        DEP_MODULES,
        PagerComponent,
        PaginationComponent
    ]
})
export class IgPagingModule {
}
