import { NgModule, Type } from '@angular/core';
import { IgPagerComponent } from './pager/pager.component';
import { IgPaginationComponent } from './pagination/pagination.component';
import { MdButtonModule, MdIconModule, MdOptionModule, MdSelectModule } from '@angular/material';
import { IgCommonModule } from '@igitras/core';

export { IPageChangeEvent } from './pagination/pagination.component';

const DEP_MODULES: Type<any>[] = [
    IgCommonModule,
    MdIconModule,
    MdSelectModule,
    MdButtonModule,
    MdOptionModule,
];

@NgModule({
    imports: [
        DEP_MODULES,
    ],
    declarations: [
        IgPaginationComponent,
        IgPagerComponent,
    ],
    exports: [
        DEP_MODULES,
        IgPaginationComponent,
        IgPagerComponent,
    ]
})
export class IgPagingModule {
}
