import { Component, Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@Directive({selector: 'dialog-title'})
export class DialogTitleDirective {}

@Directive({selector: 'dialog-content'})
export class DialogContentDirective {}

@Directive({selector: 'dialog-actions'})
export class DialogActionsDirective {}

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss' ],
})
export class DialogComponent implements AfterContentInit {

  @ContentChildren(DialogTitleDirective) dialogTitle: QueryList<DialogTitleDirective>;
  @ContentChildren(DialogContentDirective) dialogContent: QueryList<DialogContentDirective>;
  @ContentChildren(DialogActionsDirective) dialogActions: QueryList<DialogActionsDirective>;

  ngAfterContentInit(): void {
    if (this.dialogTitle.length > 1) {
      throw new Error('Duplicate dialog-title component at in dialog.');
    }
    if (this.dialogContent.length > 1) {
      throw new Error('Duplicate dialog-content component at in dialog.');
    }
    if (this.dialogActions.length > 1) {
      throw new Error('Duplicate dialog-actions component at in dialog.');
    }
  }

}
