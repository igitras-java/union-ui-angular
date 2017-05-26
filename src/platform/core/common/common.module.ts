import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgToggleDirective } from './animations/toggle/toggle.directive';
import { IgFadeDirective } from './animations/fade/fade.directive';
/**
 * FORMS
 */
// Form Directives
import { IgAutoTrimDirective } from './forms/auto-trim/auto-trim.directive';
// Validators
import { MinValidator } from './forms/validators/min/min.validator';
import { MaxValidator } from './forms/validators/max/max.validator';
/**
 * PIPES
 */
import { IgTimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { IgTimeDifferencePipe } from './pipes/time-difference/time-difference.pipe';
import { IgBytesPipe } from './pipes/bytes/bytes.pipe';
import { IgDigitsPipe } from './pipes/digits/digits.pipe';
import { IgTruncatePipe } from './pipes/truncate/truncate.pipe';
import { IgRouterPathService } from './services/router.path.service';
import { FormsModule } from '@angular/forms';
/**
 * MODELS
 */
import { Direction, IOrder, IPage, IPageable } from './models/page';
import { IModelDescriptor, IModelType, IObjectDescriptor, IFieldDescriptor, IRangeFieldDescriptor, IArrayFieldDescriptor } from './models/model';
import { IAction, IActionPerformedEvent, IContext } from './models/event'
import { MdListModule } from '@angular/material';

/**
 * ANIMATIONS
 */

const ANIMATIONS: Type<any>[] = [
    IgToggleDirective,
    IgFadeDirective,
];

export { IgToggleDirective, IgFadeDirective };
export { IgCollapseAnimation } from './animations/collapse/collapse.animation';
export { IgFadeInOutAnimation } from './animations/fade/fadeInOut.animation';


const FORMS: Type<any>[] = [
    IgAutoTrimDirective,
];

export { IgAutoTrimDirective };

const VALIDATORS: Type<any>[] = [
    MinValidator,
    MaxValidator,
];

export { MinValidator, MaxValidator };
export { IgValidators } from './forms/validators/validators';

const PIPES: Type<any>[] = [
    IgTimeAgoPipe,
    IgTimeDifferencePipe,
    IgBytesPipe,
    IgDigitsPipe,
    IgTruncatePipe,
];

export {
    IPage,
    IPageable,
    IOrder,
    Direction,

    IModelType,
    IModelDescriptor,
    IObjectDescriptor,
    IFieldDescriptor,
    IRangeFieldDescriptor,
    IArrayFieldDescriptor,

    IAction,
    IActionPerformedEvent,
    IContext,
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        FORMS,
        PIPES,
        ANIMATIONS,
        VALIDATORS,
    ],
    exports: [
        FormsModule,
        CommonModule,
        FORMS,
        PIPES,
        ANIMATIONS,
        VALIDATORS,
    ],
    providers: [
        IgRouterPathService,
    ],
})
export class IgCommonModule {

}
