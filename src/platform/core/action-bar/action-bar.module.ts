import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { IgCommonModule, IgSearchModule } from '@igitras/core';
import { MdButtonModule, MdIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdIconModule,
        IgCommonModule,
        IgSearchModule
    ],
    declarations: [
        ActionBarComponent
    ],
    exports: [
        ActionBarComponent
    ]
})
export class IgActionBarModule {
}
