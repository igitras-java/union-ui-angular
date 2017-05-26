
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
