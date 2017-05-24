import { Component, Directive, Input, Output, TemplateRef, ViewChild,
         ViewContainerRef, ContentChild, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TemplatePortalDirective, TemplatePortal } from '@angular/material';

export enum StepState {
  None = <any>'none',
  Required = <any>'required',
  Complete = <any>'complete',
}

@Directive({
  selector: '[ig-step-label]ng-template',
})
export class IgStepLabelDirective extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

@Directive({
  selector: '[ig-step-actions]ng-template',
})
export class IgStepActionsDirective extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

@Directive({
  selector: '[ig-step-summary]ng-template',
})
export class IgStepSummaryDirective extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

@Component({
  selector: 'ig-step',
  templateUrl: './step.component.html',
})
export class IgStepComponent implements OnInit {

  private _active: boolean = false;
  private _state: StepState = StepState.None;
  private _disabled: boolean = false;

  private _contentPortal: TemplatePortal;
  get stepContent(): TemplatePortal {
    return this._contentPortal;
  }

  @ViewChild(TemplateRef) _content: TemplateRef<any>;
  @ContentChild(IgStepLabelDirective) stepLabel: IgStepLabelDirective;
  @ContentChild(IgStepActionsDirective) stepActions: IgStepActionsDirective;
  @ContentChild(IgStepSummaryDirective) stepSummary: IgStepSummaryDirective;

  /**
   * label?: string
   * Sets label of [IgStepComponent] header.
   * Defaults to 'Step #'
   */
  @Input('label') label: string;

  /**
   * sublabel?: string
   * Sets sublabel of [IgStepComponent] header.
   */
  @Input('sublabel') sublabel: string;

  /**
   * active?: boolean
   * Toggles [IgStepComponent] between active/deactive.
   */
  @Input('active')
  set active(active: boolean) {
    this._setActive(active);
  }
  get active(): boolean {
    return this._active;
  }

  /**
   * disabled?: boolean
   * Disables icon and header, blocks click event and sets [IgStepComponent] to deactive if 'true'.
   */
  @Input('disabled')
  set disabled(disabled: boolean) {
    if (disabled && this._active) {
      this._active = false;
      this._onDeactivated();
    }
    this._disabled = disabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * state?: StepState or ['none' | 'required' | 'complete']
   * Sets state of [IgStepComponent] depending on value.
   * Defaults to [StepState.None | 'none'].
   */
  @Input('state')
  set state(state: StepState) {
    switch (state) {
      case StepState.Complete:
        this._state = StepState.Complete;
        break;
      case StepState.Required:
        this._state = StepState.Required;
        break;
      default:
        this._state = StepState.None;
        break;
    }
  }
  get state(): StepState {
    return this._state;
  }

  /**
   * activated?: function
   * Event emitted when [IgStepComponent] is activated.
   */
  @Output('activated') onActivated: EventEmitter<void> = new EventEmitter<void>();

  /**
   * deactivated?: function
   * Event emitted when [IgStepComponent] is deactivated.
   */
  @Output('deactivated') onDeactivated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(this._content, this._viewContainerRef);
  }

  /**
   * Toggle active state of [IgStepComponent]
   * retuns 'true' if successful, else 'false'.
   */
  toggle(): boolean {
    return this._setActive(!this._active);
  }

  /**
   * Opens [IgStepComponent]
   * retuns 'true' if successful, else 'false'.
   */
  open(): boolean {
    return this._setActive(true);
  }

  /**
   * Closes [IgStepComponent]
   * retuns 'true' if successful, else 'false'.
   */
  close(): boolean {
    return this._setActive(false);
  }

  /**
   * Returns 'true' if [state] equals to [StepState.Complete | 'complete'], else 'false'.
   */
  isComplete(): boolean {
    return this._state === StepState.Complete;
  }

  /**
   * Method to change active state internally and emit the [onActivated] event if 'true' or [onDeactivated]
   * event if 'false'. (Blocked if [disabled] is 'true')
   * returns true if successfully changed state
   */
  private _setActive(newActive: boolean): boolean {
    if (this._disabled) {
      return false;
    }
    if (this._active !== newActive) {
      this._active = newActive;
      if (newActive) {
        this._onActivated();
      } else {
        this._onDeactivated();
      }
      return true;
    }
    return false;
  }

  private _onActivated(): void {
    this.onActivated.emit(undefined);
  }

  private _onDeactivated(): void {
    this.onDeactivated.emit(undefined);
  }
}
