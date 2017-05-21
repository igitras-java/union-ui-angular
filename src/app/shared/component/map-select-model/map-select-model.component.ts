import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-map-select-model',
    templateUrl: './map-select-model.component.html',
    styleUrls: ['./map-select-model.component.css']
})
export class MapSelectModelComponent {
    currentModel: {} = {};

    @Input() allKeys: string[] = [];
    @Input() title: string = '';
    @Input() editable: boolean;

    @Output() modelChange: EventEmitter<{}> = new EventEmitter<{}>();

    entryKey: string;
    entryValue: string;
    adding: boolean = false;
    availableKeys: string[] = [];

    @Input() set model(model: {}) {
        this.currentModel = model;
        this.calculateAvailableKeys();
        this.modelChange.emit(model);
    }

    get model(): {} {
        return this.currentModel;
    }

    addingEntry() {
        this.adding = true;
        this.calculateAvailableKeys();
    }

    removeEntry(key: string) {
        delete this.currentModel[key];
        this.calculateAvailableKeys();
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

        this.currentModel[this.entryKey] = this.entryValue;
        this.calculateAvailableKeys();
        this.entryKey = null;
        this.entryValue = null;
        this.adding = continueAdding;
    }

    cancelAdding() {
        this.entryKey = null;
        this.entryValue = null;
        this.adding = false;
    }

    private calculateAvailableKeys() {
        if (this.allKeys === undefined) {
            return;
        }
        let existItems: string[] = Object.keys(this.currentModel).concat([]);
        this.availableKeys = this.allKeys.filter(item => existItems.indexOf(item) === -1);
    }

    keys(obj: any): string[] {
        let result: string[] = [];
        return Object.keys(obj).concat(result);
    }
}
