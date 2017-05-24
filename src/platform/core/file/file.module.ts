import { Type } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MdIconModule, MdButtonModule, PortalModule } from '@angular/material';

import { IgFileSelectDirective } from './directives/file-select.directive';
import { IgFileDropDirective } from './directives/file-drop.directive';
import { IgFileUploadComponent } from './file-upload/file-upload.component';
import { IgFileInputComponent, IgFileInputLabelDirective } from './file-input/file-input.component';
import { IgFileService } from './services/file.service';

const IG_FILE: Type<any>[] = [
  IgFileSelectDirective,
  IgFileDropDirective,
  IgFileUploadComponent,
  IgFileInputComponent,
  IgFileInputLabelDirective,
];

export { IgFileUploadComponent } from './file-upload/file-upload.component';
export { IgFileInputComponent, IgFileInputLabelDirective } from './file-input/file-input.component';
export { IgFileSelectDirective } from './directives/file-select.directive';
export { IgFileDropDirective } from './directives/file-drop.directive';
export { IgFileService, IUploadOptions } from './services/file.service';

@NgModule({
  imports: [
    HttpModule,
    JsonpModule,
    FormsModule,
    CommonModule,
    MdIconModule,
    MdButtonModule,
    PortalModule,
  ],
  declarations: [
    IG_FILE,
  ],
  exports: [
    IG_FILE,
  ],
  providers: [
    IgFileService,
  ],
})
export class IgFileModule {

}
