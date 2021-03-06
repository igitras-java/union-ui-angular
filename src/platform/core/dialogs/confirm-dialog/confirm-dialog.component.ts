import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'ig-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss' ],
})
export class ConfirmDialogComponent {

  title: string;
  message: string;
  cancelButton: string = 'CANCEL';
  acceptButton: string = 'ACCEPT';

  constructor(public _dialogRef: MdDialogRef<ConfirmDialogComponent>) {
  }

  cancel(): void {
    this._dialogRef.close(false);
  }

  accept(): void {
    this._dialogRef.close(true);
  }
}
