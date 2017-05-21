import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortalDirective } from '@angular/material';

@Directive({selector: '[dataTableTemplate]ng-template'})
export class DataTableTemplateDirective extends TemplatePortalDirective {

    @Input() dataTableTemplate: string;

    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
