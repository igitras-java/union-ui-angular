import { Type } from '@angular/core';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';

import { IgMessageComponent, IgMessageContainerDirective } from './message.component';

const TD_MESSAGE: Type<any>[] = [
  IgMessageComponent,
  IgMessageContainerDirective,
];

export { IgMessageComponent } from './message.component';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
  ],
  declarations: [
    TD_MESSAGE,
  ],
  exports: [
    TD_MESSAGE,
  ],
})
export class CovalentMessageModule {

}
