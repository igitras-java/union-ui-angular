import { NgModule, Type } from '@angular/core';

import { CommonModule } from '@angular/common';

import { IgCommonModule } from '../common/common.module';

import {
    IgNotificationCountComponent,
    IgNotificationCountPositionX,
    IgNotificationCountPositionY
} from './notification-count.component';

const TD_NOTIFICATIONS: Type<any>[] = [
    IgNotificationCountComponent,
];

export {
    IgNotificationCountComponent,
    IgNotificationCountPositionX,
    IgNotificationCountPositionY
} from './notification-count.component';

@NgModule({
    imports: [
        CommonModule,
        IgCommonModule,
    ],
    declarations: [
        TD_NOTIFICATIONS,
    ],
    exports: [
        TD_NOTIFICATIONS,
    ],
})
export class IgNotificationsModule {

}
