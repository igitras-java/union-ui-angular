import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MdIconModule, MdRippleModule, PortalModule } from '@angular/material';

import { IgCommonModule } from '../common/common.module';

// Steps
import { IgStepsComponent } from './steps.component';
import { IgStepHeaderComponent } from './step-header/step-header.component';
import { IgStepBodyComponent } from './step-body/step-body.component';
import { IgStepComponent, IgStepLabelDirective, IgStepActionsDirective,
         IgStepSummaryDirective } from './step.component';

const TD_STEPS: Type<any>[] = [
  IgStepsComponent,
  IgStepComponent,
  IgStepHeaderComponent,
  IgStepBodyComponent,
  IgStepLabelDirective,
  IgStepActionsDirective,
  IgStepSummaryDirective,
];

export { IgStepComponent, StepState  } from './step.component';
export { IgStepsComponent, IStepChangeEvent, StepMode } from './steps.component';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdRippleModule,
    PortalModule,
    IgCommonModule,
  ],
  declarations: [
    TD_STEPS,
  ],
  exports: [
    TD_STEPS,
  ],
})
export class IgStepsModule {

}
