import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgToggleDirective } from './animations/toggle/toggle.directive';
import { IgFadeDirective } from './animations/fade/fade.directive';
/**
 * IG_FORMS
 */
// Form Directives
import { IgAutoTrimDirective } from './forms/auto-trim/auto-trim.directive';
// Validators
import { MinValidator } from './forms/validators/min/min.validator';
import { MaxValidator } from './forms/validators/max/max.validator';
/**
 * IG_PIPES
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
import {
    IArrayFieldDescriptor,
    IDecoratorType,
    IFieldDecorator,
    IFieldDescriptor,
    IFieldFormDecorator,
    IFieldInputElement,
    IFieldTableDecorator,
    IModelDescriptor,
    IModelType,
    IObjectDescriptor,
    IRangeFieldDescriptor
} from './models/model';
import { ICommand, ICommandPerformedEvent, IEventContext } from './models/operation';

/**
 * IG_ANIMATIONS
 */

const IG_ANIMATIONS: Type<any>[] = [
    IgToggleDirective,
    IgFadeDirective,
];

export { IgToggleDirective, IgFadeDirective };
export { IgCollapseAnimation } from './animations/collapse/collapse.animation';
export { IgFadeInOutAnimation } from './animations/fade/fadeInOut.animation';


const IG_FORMS: Type<any>[] = [
    IgAutoTrimDirective,
];

export { IgAutoTrimDirective };

const IG_VALIDATORS: Type<any>[] = [
    MinValidator,
    MaxValidator,
];

export { MinValidator, MaxValidator };
export { IgValidators } from './forms/validators/validators';

const IG_PIPES: Type<any>[] = [
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
    IDecoratorType,
    IFieldInputElement,
    IFieldDecorator,
    IFieldFormDecorator,
    IFieldTableDecorator,

    ICommand,
    ICommandPerformedEvent,
    IEventContext,
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [
        IG_FORMS,
        IG_PIPES,
        IG_ANIMATIONS,
        IG_VALIDATORS,
    ],
    exports: [
        FormsModule,
        CommonModule,
        IG_FORMS,
        IG_PIPES,
        IG_ANIMATIONS,
        IG_VALIDATORS,
    ],
    providers: [
        IgRouterPathService,
    ],
})
export class IgCommonModule {

}
