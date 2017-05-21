import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent {
    title: string;
    message: string;
    closeButton: string = 'CLOSE';

    constructor(private _dialogRef: MdDialogRef<AlertDialogComponent>) {
    }

    close(): void {
        this._dialogRef.close();
    }
}
