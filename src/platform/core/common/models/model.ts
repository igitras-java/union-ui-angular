import {IModelDescriptor} from './model';

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
    label?: string;
    unit?: string;
    tooltip?: string;
    numeric?: boolean;
    format?: (value: any) => any;
    nested?: boolean;
    sortable?: boolean;
    searchable?: boolean;
    hidden?: boolean;
    filter?: boolean;
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
