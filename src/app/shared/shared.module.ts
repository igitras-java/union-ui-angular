/**
 * Created by mason on 05/11/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MarkdownPipe } from './pipe/markdown.pipe';
import { MapModelComponent } from './component/map-model/map-model.component';
import { MapSelectModelComponent } from './component/map-select-model/map-select-model.component';
import { ProfileModelComponent } from './component/account/profile-model/profile-model.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { PaginationComponent } from './libs/pagination/pagination.component';
import { CustomMaterialModule } from '../custom-material.module';
import { ReducePipe } from './pipe/reduce.pipe';
import { TableActionComponent } from './libs/table-action/table-action.component';
import { SearchComponent } from './libs/search/search.component';
import { ConfirmActionComponent } from './libs/confirm-action/confirm-action.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        CustomMaterialModule
    ],
    declarations: [
        MarkdownPipe,
        TruncatePipe,
        MapModelComponent,
        MapSelectModelComponent,
        ProfileModelComponent,
        PaginationComponent,
        ReducePipe,
        TableActionComponent,
        SearchComponent,
        ConfirmActionComponent
    ],
    exports: [
        MarkdownPipe,
        TruncatePipe,
        MapModelComponent,
        MapSelectModelComponent,
        ProfileModelComponent,
        PaginationComponent,
        TableActionComponent,
        SearchComponent,
        ConfirmActionComponent
    ],
    entryComponents: [
        ConfirmActionComponent
    ]
})
export class SharedModule {
}
