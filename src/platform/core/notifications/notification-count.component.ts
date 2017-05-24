import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewChild
} from '@angular/core';

export enum IgNotificationCountPositionY {
    Top = <any>'top',
    Bottom = <any>'bottom',
    Center = <any>'center',
}

export enum IgNotificationCountPositionX {
    Before = <any>'before',
    After = <any>'after',
    Center = <any>'center',
}

@Component({
    selector: 'ig-notification-count',
    styleUrls: ['./notification-count.component.scss'],
    templateUrl: './notification-count.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IgNotificationCountComponent implements AfterContentInit {

    private _notifications: number | boolean = 0;
    private _positionY: IgNotificationCountPositionY;
    private _positionX: IgNotificationCountPositionX;

    /**
     * Div content wrapper of `ng-content`.
     */
    @ViewChild('content') content: ElementRef;

    /**
     * color?: "primary" | "accent" | "warn"
     * Sets the theme color of the notification tip. Defaults to "warn"
     */
    @Input() color: 'primary' | 'accent' | 'warn' = 'warn';

    /**
     * positionX?: IgNotificationCountPositionX or "before" | "after" | "center"
     * Sets the X position of the notification tip.
     * Defaults to "after" if it has content, else 'center'.
     */
    @Input()
    set positionX(positionX: IgNotificationCountPositionX) {
        this._positionX = positionX;
    }

    get positionX(): IgNotificationCountPositionX {
        return this._positionX;
    }

    /**
     * positionY?: IgNotificationCountPositionY or "top" | "bottom" | "center"
     * Sets the Y position of the notification tip.
     * Defaults to "top" if it has content, else 'center'.
     */
    @Input()
    set positionY(positionY: IgNotificationCountPositionY) {
        this._positionY = positionY;
    }

    get positionY(): IgNotificationCountPositionY {
        return this._positionY;
    }

    /**
     * notifications?: number | boolean
     * Number for the notification count. Shows component only if the input is a positive number or 'true'
     */
    @Input()
    set notifications(notifications: number | boolean) {
        this._notifications = notifications;
    }

    @HostBinding('class.ig-notification-hidden')
    get hideHost(): boolean {
        return !this.show && !this._hasContent();
    }

    /**
     * Sets the component in its 'noCount' state if [notifications] is a boolean 'true'.
     * Makes the notification tip show without a count.
     */
    get noCount(): string | boolean {
        return this._notifications === true;
    }

    /**
     * Notification display string when a count is available.
     * Anything over 99 gets set as 99+
     */
    get notificationsDisplay(): string {
        if (this._notifications > 99) {
            return '99+';
        }
        return this._notifications.toString();
    }

    /**
     * Shows notification tip only when [notifications] is true or a positive integer.
     */
    get show(): boolean {
        return this._notifications === true || (!isNaN(<any>this._notifications) && this._notifications > 0);
    }

    /**
     * Check if [positionX] and [positionY] have been set as inputs, else use defaults depending on component content.
     */
    ngAfterContentInit(): void {
        if (!this._positionX) {
            this.positionX = this._hasContent() ? IgNotificationCountPositionX.After : IgNotificationCountPositionX.Center;
        }
        if (!this._positionY) {
            this.positionY = this._hasContent() ? IgNotificationCountPositionY.Top : IgNotificationCountPositionY.Center;
        }
    }

    /**
     * Method to check if element has any kind of content (elements or text)
     */
    private _hasContent(): boolean {
        if (this.content) {
            let contentElement: HTMLElement = this.content.nativeElement;
            return contentElement && (contentElement.children.length > 0 || !!contentElement.textContent.trim());
        }
        return false;
    }

}
