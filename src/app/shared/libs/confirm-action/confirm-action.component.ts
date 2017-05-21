import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-confirm-action',
    templateUrl: './confirm-action.component.html',
    styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent {

    title: string;
    content: string;

    constructor(public dialogRef: MdDialogRef<ConfirmActionComponent>) {
    }
}
