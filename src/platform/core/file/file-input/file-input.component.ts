import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { TemplatePortalDirective } from '@angular/material';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop: any = () => {
    // empty method
};

export const FILE_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IgFileInputComponent),
    multi: true,
};

@Directive({
    selector: '[ig-file-input-label]ng-template',
})
export class IgFileInputLabelDirective extends TemplatePortalDirective {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FILE_INPUT_CONTROL_VALUE_ACCESSOR],
    selector: 'ig-file-input',
    styleUrls: ['./file-input.component.scss'],
    templateUrl: './file-input.component.html',
})
export class IgFileInputComponent implements ControlValueAccessor {

    /**
     * Implemented as part of ControlValueAccessor.
     */
    private _value: FileList | File = undefined;

    // get/set accessor (needed for ControlValueAccessor)
    get value(): FileList | File {
        return this._value;
    }

    set value(v: FileList | File) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    private _multiple: boolean = false;
    private _disabled: boolean = false;

    /** The native `<input type="file"> element */
    @ViewChild('fileInput') _inputElement: ElementRef;
    get inputElement(): HTMLInputElement {
        return this._inputElement.nativeElement;
    }

    /**
     * color?: string
     * Sets button color. Uses same color palette accepted as [mdButton].
     */
    @Input('color') color: string;

    /**
     * multiple?: boolean
     * Sets if multiple files can be dropped/selected at once in [IgFileInputComponent].
     */
    @Input('multiple')
    set multiple(multiple: string | boolean) {
        this._multiple = multiple !== '' ? (multiple === 'true' || multiple === true) : true;
    }

    get multiple(): string | boolean {
        return this._multiple;
    }

    /**
     * accept?: string
     * Sets files accepted when opening the file browser dialog.
     * Same as 'accept' attribute in <input/> element.
     */
    @Input('accept') accept: string;

    /**
     * disabled?: boolean
     * Disables [IgFileInputComponent] and clears selected/dropped files.
     */
    @Input('disabled')
    set disabled(disabled: boolean) {
        if (disabled) {
            this.clear();
        }
        this._disabled = disabled;
    }

    get disabled(): boolean {
        return this._disabled;
    }

    /**
     * select?: function
     * Event emitted a file is selected
     * Emits a [File | FileList] object.
     */
    @Output('select') onSelect: EventEmitter<File | FileList> = new EventEmitter<File | FileList>();

    constructor(private _renderer: Renderer2, private _changeDetectorRef: ChangeDetectorRef) {

    }

    /**
     * Method executed when a file is selected.
     */
    handleSelect(files: File | FileList): void {
        this.writeValue(files);
        this.onSelect.emit(files);
    }

    /**
     * Used to clear the selected files from the [IgFileInputComponent].
     */
    clear(): void {
        this.writeValue(undefined);
        this._renderer.setProperty(this.inputElement, 'value', '');
    }

    /**
     * Implemented as part of ControlValueAccessor.
     */
    writeValue(value: any): void {
        this.value = value;
        this._changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onChange = (_: any) => noop;
    onTouched = () => noop;

}
