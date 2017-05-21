import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss' ],
})
export class PromptDialogComponent {
  title: string;
  message: string;
  value: string;
  cancelButton: string = 'CANCEL';
  acceptButton: string = 'ACCEPT';

  constructor(private _dialogRef: MdDialogRef<PromptDialogComponent>) {}

  cancel(): void {
    this._dialogRef.close(undefined);
  }

  accept(): void {
    this._dialogRef.close(this.value);
  }
}
