/**
 * Model Field Descriptor.
 */
export interface IFieldDescriptor {
    name: string;
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

export interface IContext {
    content: any[];
}

export interface IAction {
    name: string;
    icon?: string;
    title?: string;
    color?: string;
}

export interface IActionPerformedEvent {
    action: IAction;
    context: IContext;
}