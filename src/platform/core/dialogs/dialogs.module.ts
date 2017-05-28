import { NgModule, Type } from '@angular/core';
import { MdButtonModule, MdDialogModule, MdInputModule } from '@angular/material';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { DialogService } from './services/dialog.service';
import { IgCommonModule } from '@igitras/core';

const DIALOGS: Type<any>[] = [
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
];

const DEP_MODULES: Type<any> [] = [
    IgCommonModule,
    MdDialogModule,
    MdInputModule,
    MdButtonModule,
];

export { IAlertConfig, IConfirmConfig, IPromptConfig } from './services/dialog.service';
export {
    DialogService,
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent
};

@NgModule({
    imports: [
        DEP_MODULES,
    ],
    declarations: [
        DIALOGS,
    ],
    exports: [
        DEP_MODULES,
        DIALOGS,
    ],
    providers: [
        DialogService,
    ],
    entryComponents: [
        DIALOGS,
    ],
})
export class IgDialogsModule {

}
