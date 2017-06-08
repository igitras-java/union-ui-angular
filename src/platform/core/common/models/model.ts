import { IModelDescriptor } from './model';

/**
 * Model Types.
 */
export enum IModelType {
    String = <any>'String',
    Boolean = <any>'Boolean',
    Number = <any>'Number',
    Object = <any>'Object',
    Range = <any>'Range',
    Array = <any>'Array',
}

/**
 * Base Model Descriptor.
 */
export interface IModelDescriptor {
    name: string;
    type: IModelType;
    alias?: string;
}

/**
 * Model Descriptor. The whole world is building on this.
 *
 * The type of this descriptor is always Object.
 */
export interface IObjectDescriptor extends IModelDescriptor {
    fields: IModelDescriptor[];
}

/**
 * Model Field Descriptor.
 */
export interface IFieldDescriptor extends IModelDescriptor {
    unit?: string;
    tooltip?: string;
    decorators?: IFieldDecorator[];
}

/**
 * Model Field Descriptor which the field value is a range.
 */
export interface IRangeFieldDescriptor extends IFieldDescriptor {
    from: any;
    to: any;
    etype: IModelType;
}

/**
 * Model Field Descriptor which the field value is an array.
 */
export interface IArrayFieldDescriptor extends IFieldDescriptor {
    content: any[];
    etype: IModelType;
    unique: boolean;
}

export enum IDecoratorType {
    Form = <any>'Form',
    Table = <any>'Table',
}

export enum IFieldInputElement {
    Input = <any>'input',
    Password = <any>'password',
    Textarea = <any>'textarea',
    Slider = <any>'slider',
    SlideToggle = <any>'slide-toggle',
    Checkbox = <any>'checkbox',
    Select = <any>'select',
}

/**
 * Decorator for Present or Action.
 */
export interface IFieldDecorator {
    type: IDecoratorType;
    hidden?: boolean;
}

/**
 * Decorator for the field present in the form.
 */
export interface IFieldFormDecorator extends IFieldDecorator {
    // how to render
    flex?: number;
    input?: IFieldInputElement;

    // input helper
    default?: any;

    // constrains
    required?: boolean;
    pattern?: string;
    min?: any;
    max?: any;

    // options
    selections?: () => any[];
}

/**
 * Decorator for the field present in the table.
 */
export interface IFieldTableDecorator extends IFieldDecorator {
    // actions
    sortable?: boolean;
    searchable?: boolean;

    // how to render
    format?: (value: any) => any;
}
