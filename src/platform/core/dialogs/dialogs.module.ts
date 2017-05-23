import { NgModule, Type } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdDialogModule, MdInputModule } from '@angular/material';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { DialogService } from './services/dialog.service';

const DIALOGS: Type<any>[] = [
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
];

const DIALOGS_ENTRY_COMPONENTS: Type<any>[] = [
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
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
        FormsModule,
        CommonModule,
        MdDialogModule,
        MdInputModule,
        MdButtonModule,
    ],
    declarations: [
        DIALOGS,
    ],
    exports: [
        DIALOGS,
    ],
    providers: [
        DialogService,
    ],
    entryComponents: [
        DIALOGS_ENTRY_COMPONENTS,
    ],
})
export class IgDialogsModule {

}
