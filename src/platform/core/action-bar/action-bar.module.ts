import { NgModule, Type } from '@angular/core';
import { IgActionBarComponent } from './action-bar.component';
import { IgCommonModule, IgSearchModule } from '@igitras/core';
import { MdButtonModule, MdIconModule } from '@angular/material';

const DEP_MODULES: Type<any>[] = [
    IgCommonModule,
    IgSearchModule,
    MdButtonModule,
    MdIconModule,
];
@NgModule({
    imports: [
        DEP_MODULES,
    ],
    declarations: [
        IgActionBarComponent
    ],
    exports: [
        DEP_MODULES,
        IgActionBarComponent
    ]
})
export class IgActionBarModule {
}
