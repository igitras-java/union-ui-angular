import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import 'hammerjs';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdCheckbox, MdPseudoCheckbox } from '@angular/material';
import { DataTableColumnComponent } from './data-table-column/data-table-column.component';
import { DataTableRowComponent } from './data-table-row/data-table-row.component';
import { DataTableComponent, IDataTableColumn } from './data-table.component';
import { DataTableService } from './services/data-table.service';
import { IgDataTableModule } from './data-table.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: DataTable', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                IgDataTableModule,
            ],
            declarations: [
                DataTableBasicTestComponent,
                DataTableSelectableTestComponent,
                DataTableRowClickTestComponent,
            ],
            providers: [
                DataTableService,
            ],
        });
        TestBed.compileComponents();
    }));

    it('should set hidden and not get search hits and set it to false and get search results', (done: DoneFn) => {
        inject([DataTableService], (tdDataTableService: DataTableService) => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(DataTableBasicTestComponent);
            let component: DataTableBasicTestComponent = fixture.debugElement.componentInstance;

            component.columns[1].hidden = false;
            // backwards compatability test
            expect(tdDataTableService.filterData(component.data, '1452-2', true).length).toBe(1);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                // check if there are no hidden columns
                expect(fixture.debugElement.queryAll(By.directive(DataTableColumnComponent))
                    .filter((col: DebugElement) => {
                        return (<any>(<HTMLElement>col.nativeElement).attributes).hidden;
                    }).length).toBe(0);

                // check how many rows would return that contain Pork if no hidden columns
                expect(tdDataTableService.filterData(component.data, 'Pork', true, component.columns
                    .filter((column: IDataTableColumn) => {
                        return column.hidden === true;
                    }).map((column: IDataTableColumn) => {
                        return column.name;
                    })).length).toBe(1);

                component.columns[1].hidden = true;
                fixture.debugElement.query(By.directive(DataTableComponent)).componentInstance.refresh();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    // check if there are hidden columns
                    expect(fixture.debugElement.queryAll(By.directive(DataTableColumnComponent))
                        .filter((col: DebugElement) => {
                            return (<any>(<HTMLElement>col.nativeElement).attributes).hidden;
                        }).length).toBe(1);

                    // check how many rows would return that contain Pork if the column is hidden
                    expect(tdDataTableService.filterData(component.data, 'Pork', true, component.columns
                        .filter((column: IDataTableColumn) => {
                            return column.hidden === true;
                        }).map((column: IDataTableColumn) => {
                            return column.name;
                        })).length).toBe(0);
                    done();
                });
            });
        })();
    });

    it('should set filter and not get search hits and set it to false and get search results', (done: DoneFn) => {
        inject([DataTableService], (dataTableService: DataTableService) => {
            let fixture: ComponentFixture<any> = TestBed.createComponent(DataTableBasicTestComponent);
            let component: DataTableBasicTestComponent = fixture.debugElement.componentInstance;

            component.columns[1].filter = false;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.columns[1].filter).toBe(false);

                // backwards compatability test
                expect(dataTableService.filterData(component.data, '1452-2', true).length).toBe(1);

                // check how many rows would return that contain Pork if the second column has filter = false
                expect(dataTableService.filterData(component.data, 'Pork', true, component.columns
                    .filter((column: IDataTableColumn) => {
                        return (typeof column.filter !== undefined && column.filter === false);
                    }).map((column: IDataTableColumn) => {
                        return column.name;
                    })).length).toBe(0);

                // set the second column as filtered
                component.columns[1].filter = true;
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    // check how many rows would return that contain Pork if the seconds column has filter = true
                    expect(dataTableService.filterData(component.data, 'Pork', true, component.columns
                        .filter((column: IDataTableColumn) => {
                            return (typeof column.filter !== undefined && column.filter === false);
                        }).map((column: IDataTableColumn) => {
                            return column.name;
                        })).length).toBe(1);
                    done();
                });
            });
        })();
    });

    describe('selectable and multiple', () => {

        it('should not set the data input and not fail', (done: DoneFn) => {
            inject([], () => {
                let fixture: ComponentFixture<any> = TestBed.createComponent(DataTableSelectableTestComponent);
                let element: DebugElement = fixture.debugElement;
                let component: DataTableSelectableTestComponent = fixture.debugElement.componentInstance;

                component.selectable = true;
                component.multiple = true;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    // if it finishes in means it didnt fail
                    done();
                });
            })();
        });

        it('should select one and be in indeterminate state, select all and then unselect all',
            (done: DoneFn) => {
                inject([], () => {
                    let fixture: ComponentFixture<any> = TestBed.createComponent(DataTableSelectableTestComponent);
                    let element: DebugElement = fixture.debugElement;
                    let component: DataTableSelectableTestComponent = fixture.debugElement.componentInstance;

                    component.selectable = true;
                    component.multiple = true;
                    component.columns = [
                        {name: 'sku', label: 'SKU #'},
                        {name: 'item', label: 'Item name'},
                        {name: 'price', label: 'Price (US$)', numeric: true},
                    ];

                    component.data = [{sku: '1452-2', item: 'Pork Chops', price: 32.11},
                        {sku: '1421-0', item: 'Prime Rib', price: 41.15},
                        {sku: '1452-1', item: 'Sirlone', price: 22.11},
                        {sku: '1421-3', item: 'T-Bone', price: 51.15}];

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        let dataTableComponent: DataTableComponent = fixture.debugElement.query(By.directive(DataTableComponent)).componentInstance;
                        // check how many rows (without counting the columns) were rendered
                        expect(fixture.debugElement.queryAll(By.directive(DataTableRowComponent)).length - 1).toBe(4);
                        // check to see checkboxes states
                        expect(dataTableComponent.indeterminate).toBeFalsy();
                        expect(dataTableComponent.allSelected).toBeFalsy();
                        // select a row with a click event
                        fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[2].triggerEventHandler('click', new Event('click'));
                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            // check to see if its in indeterminate state
                            expect(dataTableComponent.indeterminate).toBeTruthy();
                            expect(dataTableComponent.allSelected).toBeFalsy();
                            // select the rest of the rows by clicking in selectAll
                            fixture.debugElement.query(By.directive(MdCheckbox)).triggerEventHandler('click', new Event('click'));
                            fixture.detectChanges();
                            fixture.whenStable().then(() => {
                                // check to see if its in indeterminate state and allSelected
                                expect(dataTableComponent.indeterminate).toBeTruthy();
                                expect(dataTableComponent.allSelected).toBeTruthy();
                                // unselect all rows by clicking in unselect all
                                fixture.debugElement.query(By.directive(MdCheckbox)).triggerEventHandler('click', new Event('click'));
                                fixture.detectChanges();
                                fixture.whenStable().then(() => {
                                    // check to see if its not in indeterminate state and not allSelected
                                    expect(dataTableComponent.indeterminate).toBeFalsy();
                                    expect(dataTableComponent.allSelected).toBeFalsy();
                                    done();
                                });
                            });
                        });
                    });
                })();
            });

        it('should be interminate when atleast one row is selected and allSelected when all rows are selected',
            (done: DoneFn) => {
                inject([], () => {
                    let fixture: ComponentFixture<any> = TestBed.createComponent(DataTableSelectableTestComponent);
                    let element: DebugElement = fixture.debugElement;
                    let component: DataTableSelectableTestComponent = fixture.debugElement.componentInstance;

                    component.selectable = true;
                    component.multiple = true;
                    component.columns = [
                        {name: 'sku', label: 'SKU #'},
                        {name: 'item', label: 'Item name'},
                        {name: 'price', label: 'Price (US$)', numeric: true},
                    ];

                    component.data = [{sku: '1452-2', item: 'Pork Chops', price: 32.11},
                        {sku: '1421-0', item: 'Prime Rib', price: 41.15},
                        {sku: '1452-1', item: 'Sirlone', price: 22.11},
                        {sku: '1421-3', item: 'T-Bone', price: 51.15}];

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        let dataTableComponent: DataTableComponent = fixture.debugElement.query(By.directive(DataTableComponent)).componentInstance;
                        // check how many rows (without counting the columns) were rendered
                        expect(fixture.debugElement.queryAll(By.directive(DataTableRowComponent)).length - 1).toBe(4);
                        // check to see checkboxes states
                        expect(dataTableComponent.indeterminate).toBeFalsy();
                        expect(dataTableComponent.allSelected).toBeFalsy();
                        // select a row with a click event
                        fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[2].triggerEventHandler('click', new Event('click'));
                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            // check to see if its in indeterminate state
                            expect(dataTableComponent.indeterminate).toBeTruthy();
                            expect(dataTableComponent.allSelected).toBeFalsy();
                            // select the rest of the rows
                            fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[0].triggerEventHandler('click', new Event('click'));
                            fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[1].triggerEventHandler('click', new Event('click'));
                            fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[3].triggerEventHandler('click', new Event('click'));
                            fixture.detectChanges();
                            fixture.whenStable().then(() => {
                                // check to see if its in indeterminate state and allSelected
                                expect(dataTableComponent.indeterminate).toBeTruthy();
                                expect(dataTableComponent.allSelected).toBeTruthy();
                                // unselect one of the rows
                                fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[2].triggerEventHandler('click', new Event('click'));
                                fixture.detectChanges();
                                fixture.whenStable().then(() => {
                                    // check to see if its in indeterminate state and not allSelected
                                    expect(dataTableComponent.indeterminate).toBeTruthy();
                                    expect(dataTableComponent.allSelected).toBeFalsy();
                                    done();
                                });
                            });
                        });
                    });
                })();
            });

        it('should shift click and select a range of rows',
            (done: DoneFn) => {
                inject([], () => {
                    let fixture: ComponentFixture<any> = TestBed.createComponent(DataTableSelectableTestComponent);
                    let element: DebugElement = fixture.debugElement;
                    let component: DataTableSelectableTestComponent = fixture.debugElement.componentInstance;

                    component.selectable = true;
                    component.multiple = true;
                    component.columns = [
                        {name: 'sku', label: 'SKU #'},
                        {name: 'item', label: 'Item name'},
                        {name: 'price', label: 'Price (US$)', numeric: true},
                    ];

                    component.data = [{sku: '1452-2', item: 'Pork Chops', price: 32.11},
                        {sku: '1421-0', item: 'Prime Rib', price: 41.15},
                        {sku: '1452-1', item: 'Sirlone', price: 22.11},
                        {sku: '1421-3', item: 'T-Bone', price: 51.15}];

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        let dataTableComponent: DataTableComponent = fixture.debugElement.query(By.directive(DataTableComponent)).componentInstance;
                        // check how many rows (without counting the columns) were rendered
                        expect(fixture.debugElement.queryAll(By.directive(DataTableRowComponent)).length - 1).toBe(4);
                        // check to see checkboxes states
                        expect(dataTableComponent.indeterminate).toBeFalsy();
                        expect(dataTableComponent.allSelected).toBeFalsy();

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            // select the first and last row with shift key also selected and should then select all checkboxes
                            let clickEvent: MouseEvent = document.createEvent('MouseEvents');
                            // the 12th parameter below 'true' sets the shift key to be clicked at the same time as as the mouse click
                            clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true/*shiftkey*/, false, 0, document.body.parentNode);
                            fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[0].nativeElement.dispatchEvent(clickEvent);
                            fixture.debugElement.queryAll(By.directive(MdPseudoCheckbox))[3].nativeElement.dispatchEvent(clickEvent);
                            fixture.detectChanges();
                            fixture.whenStable().then(() => {
                                // check to see if allSelected is true
                                expect(dataTableComponent.allSelected).toBeTruthy();
                                done();
                            });
                        });
                    });
                })();
            });

        it('should click on a row and see the rowClick Event',
            async(inject([], () => {
                let fixture: ComponentFixture<any> = TestBed.createComponent(DataTableRowClickTestComponent);
                let component: DataTableRowClickTestComponent = fixture.debugElement.componentInstance;

                let eventSpy: jasmine.Spy = spyOn(component, 'clickEvent');

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.debugElement.queryAll(By.directive(DataTableRowComponent))[1].nativeElement.click();
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        expect(eventSpy.calls.count()).toBe(0);

                        component.clickable = true;
                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.debugElement.queryAll(By.directive(DataTableRowComponent))[1].nativeElement.click();
                            fixture.detectChanges();
                            fixture.whenStable().then(() => {
                                expect(eventSpy.calls.count()).toBe(1);
                            });
                        });
                    });
                });
            })));
    });
});

@Component({
    template: `
        <td-data-table
                [data]="data"
                [columns]="columns">
        </td-data-table>`,
})
class DataTableBasicTestComponent {
    data: any[] = [
        {sku: '1452-2', item: 'Pork Chops', price: 32.11},
        {sku: '1421-0', item: 'Prime Rib', price: 41.15},
    ];
    columns: IDataTableColumn[] = [
        {name: 'sku', label: 'SKU #'},
        {name: 'item', label: 'Item name'},
        {name: 'price', label: 'Price (US$)', numeric: true},
    ];
}

@Component({
    template: `
        <td-data-table
                [data]="data"
                [columns]="columns"
                [selectable]="selectable"
                [multiple]="multiple">
        </td-data-table>`,
})
class DataTableSelectableTestComponent {
    data: any;
    columns: any;
    selectable: boolean = false;
    multiple: boolean = false;
}

@Component({
    template: `
        <td-data-table
                [data]="data"
                [columns]="columns"
                [clickable]="clickable"
                (rowClick)="clickEvent()">
        </td-data-table>`,
})
class DataTableRowClickTestComponent {
    data: any[] = [
        {sku: '1452-2', item: 'Pork Chops', price: 32.11},
        {sku: '1421-0', item: 'Prime Rib', price: 41.15},
    ];
    columns: IDataTableColumn[] = [
        {name: 'sku', label: 'SKU #'},
        {name: 'item', label: 'Item name'},
        {name: 'price', label: 'Price (US$)', numeric: true},
    ];
    clickable: boolean = false;

    clickEvent(): void {
        /* noop */
    }
}
