import { Injectable, ViewContainerRef } from '@angular/core';
import { ComponentType, MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';

export interface IDialogConfig {
    title?: string;
    message: string;
    viewContainerRef?: ViewContainerRef;
    disableClose?: boolean;
}

export interface IAlertConfig extends IDialogConfig {
    closeButton?: string;
}

export interface IConfirmConfig extends IDialogConfig {
    acceptButton?: string;
    cancelButton?: string;
}

export interface IPromptConfig extends IConfirmConfig {
    value?: string;
}

@Injectable()
export class DialogService {

    constructor(private _dialogService: MdDialog) {
    }

    /**
     * params:
     * - component: ComponentType<T>
     * - config: MdDialogConfig
     * Wrapper function over the open() method in MdDialog.
     * Opens a modal dialog containing the given component.
     */
    public open<T>(component: ComponentType<T>, config?: MdDialogConfig): MdDialogRef<T> {
        return this._dialogService.open(component, config);
    }

    /**
     * Wrapper function over the closeAll() method in MdDialog.
     * Closes all of the currently-open dialogs.
     */
    public closeAll(): void {
        this._dialogService.closeAll();
    }

    /**
     * params:
     * - config: IAlertConfig {
   *     message: string;
   *     title?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     closeButton?: string;
   * }
     *
     * Opens an alert dialog with the provided config.
     * Returns an MdDialogRef<AlertDialogComponent> object.
     */
    public openAlert(config: IAlertConfig): MdDialogRef<AlertDialogComponent> {
        let dialogConfig: MdDialogConfig = this._createConfig(config);
        let dialogRef: MdDialogRef<AlertDialogComponent> =
            this._dialogService.open(AlertDialogComponent, dialogConfig);
        let alertDialogComponent: AlertDialogComponent = dialogRef.componentInstance;
        alertDialogComponent.title = config.title;
        alertDialogComponent.message = config.message;
        if (config.closeButton) {
            alertDialogComponent.closeButton = config.closeButton;
        }
        return dialogRef;
    }

    /**
     * params:
     * - config: IConfirmConfig {
   *     message: string;
   *     title?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     acceptButton?: string;
   *     cancelButton?: string;
   * }
     *
     * Opens a confirm dialog with the provided config.
     * Returns an MdDialogRef<ConfirmDialogComponent> object.
     */
    public openConfirm(config: IConfirmConfig): MdDialogRef<ConfirmDialogComponent> {
        let dialogConfig: MdDialogConfig = this._createConfig(config);
        let dialogRef: MdDialogRef<ConfirmDialogComponent> =
            this._dialogService.open(ConfirmDialogComponent, dialogConfig);
        let confirmDialogComponent: ConfirmDialogComponent = dialogRef.componentInstance;
        confirmDialogComponent.title = config.title;
        confirmDialogComponent.message = config.message;
        if (config.acceptButton) {
            confirmDialogComponent.acceptButton = config.acceptButton;
        }
        if (config.cancelButton) {
            confirmDialogComponent.cancelButton = config.cancelButton;
        }
        return dialogRef;
    }

    /**
     * params:
     * - config: IPromptConfig {
   *     message: string;
   *     title?: string;
   *     value?: string;
   *     viewContainerRef?: ViewContainerRef;
   *     acceptButton?: string;
   *     cancelButton?: string;
   * }
     *
     * Opens a prompt dialog with the provided config.
     * Returns an MdDialogRef<PromptDialogComponent> object.
     */
    public openPrompt(config: IPromptConfig): MdDialogRef<PromptDialogComponent> {
        let dialogConfig: MdDialogConfig = this._createConfig(config);
        let dialogRef: MdDialogRef<PromptDialogComponent> =
            this._dialogService.open(PromptDialogComponent, dialogConfig);
        let promptDialogComponent: PromptDialogComponent = dialogRef.componentInstance;
        promptDialogComponent.title = config.title;
        promptDialogComponent.message = config.message;
        promptDialogComponent.value = config.value;
        if (config.acceptButton) {
            promptDialogComponent.acceptButton = config.acceptButton;
        }
        if (config.cancelButton) {
            promptDialogComponent.cancelButton = config.cancelButton;
        }
        return dialogRef;
    }

    private _createConfig(config: MdDialogConfig): MdDialogConfig {
        let dialogConfig: MdDialogConfig = new MdDialogConfig();
        dialogConfig.viewContainerRef = config.viewContainerRef;
        dialogConfig.disableClose = config.disableClose;
        return dialogConfig;
    }

}
