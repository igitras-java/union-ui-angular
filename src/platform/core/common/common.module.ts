import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleDirective } from './animations/toggle/toggle.directive';
import { FadeDirective } from './animations/fade/fade.directive';
/**
 * FORMS
 */
// Form Directives
import { AutoTrimDirective } from './forms/auto-trim/auto-trim.directive';
// Validators
import { MinValidator } from './forms/validators/min/min.validator';
import { MaxValidator } from './forms/validators/max/max.validator';
/**
 * PIPES
 */
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { TimeDifferencePipe } from './pipes/time-difference/time-difference.pipe';
import { BytesPipe } from './pipes/bytes/bytes.pipe';
import { DigitsPipe } from './pipes/digits/digits.pipe';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { RouterPathService } from './services/router.path.service';
import { FormsModule } from '@angular/forms';
/**
 * MODELS
 */
import { Direction, IOrder, IPage, IPageable } from './models/page';
import { IAction, IActionPerformedEvent, IContext, IFieldDescriptor } from './models/model';
import { MdListModule } from '@angular/material';

/**
 * ANIMATIONS
 */

const ANIMATIONS: Type<any>[] = [
    ToggleDirective,
    FadeDirective,
];

export { ToggleDirective, FadeDirective };
export { CollapseAnimation } from './animations/collapse/collapse.animation';
export { FadeInOutAnimation } from './animations/fade/fadeInOut.animation';


const FORMS: Type<any>[] = [
    AutoTrimDirective,
];

export { AutoTrimDirective };

const VALIDATORS: Type<any>[] = [
    MinValidator,
    MaxValidator,
];

export { MinValidator, MaxValidator };
export { IgValidators } from './forms/validators/validators';

const PIPES: Type<any>[] = [
    TimeAgoPipe,
    TimeDifferencePipe,
    BytesPipe,
    DigitsPipe,
    TruncatePipe,
];

export {
    IPage,
    IPageable,
    IOrder,
    Direction,

    IFieldDescriptor,
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
        RouterPathService,
    ],
})
export class IgCommonModule {

}
