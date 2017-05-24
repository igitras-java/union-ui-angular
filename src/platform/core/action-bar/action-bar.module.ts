import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { IgCommonModule, IgSearchModule } from '@igitras/core';
import { MdButtonModule, MdIconModule } from '@angular/material';

const DEP_MODULES: Type<any>[] = [
    MdButtonModule,
    MdIconModule,
    IgCommonModule,
    IgSearchModule
];

@NgModule({
    imports: [
        CommonModule,
        DEP_MODULES,
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
