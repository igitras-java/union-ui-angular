/**
 * All the operation applied to model is called command.
 */
export interface ICommand {
    name: string;
    icon?: string;
    title?: string;
    color?: string;
}

/**
 * The event context.
 */
export interface IEventContext {
    content: any[];
}

/**
 * If the command is performed, there will be a event raised.
 */
export interface ICommandPerformedEvent {
    action: ICommand;
    context: IEventContext;
}
