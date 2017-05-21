import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-map-model',
    templateUrl: './map-model.component.html',
    styleUrls: ['./map-model.component.css']
})
export class MapModelComponent {

    @Input() title: string;
    @Input() editable: boolean;

    @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() model: any = {};

    entryKey: string;
    entryValue: string;
    adding: boolean = false;


    addingEntry() {
        this.adding = true;
    }

    removeEntry(key: string) {
        delete this.model[key];
    }

    confirmAdding(continueAdding: boolean) {
        if (this.entryKey === undefined || this.entryKey === '') {
            alert("配置项名不能为空！");
            return;
        }

        if (this.entryValue === undefined || this.entryValue === '') {
            alert("配置项值不能为空！");
            return;
        }

        this.model[this.entryKey] = this.entryValue;
        this.entryKey = null;
        this.entryValue = null;
        this.adding = continueAdding;
    }

    cancelAdding() {
        this.entryKey = null;
        this.entryValue = null;
        this.adding = false;
    }

    keys(obj: any): string[] {
        return Object.keys(obj).concat([]);
    }

}
