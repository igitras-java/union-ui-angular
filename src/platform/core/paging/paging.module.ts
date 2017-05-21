import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdOptionModule, MdSelectModule } from '@angular/material';
import { IgCommonModule } from '@igitras/core';

export { IPageChangeEvent } from './pagination/pagination.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MdIconModule,
        MdSelectModule,
        MdButtonModule,
        MdOptionModule,
        IgCommonModule
    ],
    declarations: [
        PagerComponent,
        PaginationComponent
    ],
    exports: [
        PagerComponent,
        PaginationComponent
    ]
})
export class IgPagingModule {
}
