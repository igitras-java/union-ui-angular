/**
 * Model Field Descriptor.
 */
export interface IFieldDescriptor {
    name: string;
    label: string;
    tooltip?: string;
    numeric?: boolean;
    format?: (value: any) => any;
    nested?: boolean;
    sortable?: boolean;
    searchable?: boolean;
    hidden?: boolean;
    filter?: boolean;
}