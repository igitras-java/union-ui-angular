import { Component, OnInit } from '@angular/core';
import { SearchOption } from '../shared/libs/search/search.component';
import {
    DataTableService,
    Direction,
    IDataTableRowAction,
    IDataTableRowActionPerformedEvent,
    IDataTableSortChangedEvent,
    IFieldDescriptor,
    IPage,
    IPageChangeEvent,
    ISearchItem
} from '@igitras/core';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    editable: boolean = true;

    _map: any = {};

    firstLast: boolean = true;

    columns: IFieldDescriptor[] = [
        {name: 'name', label: 'Dessert', unit: '100g serving', sortable: true, searchable: true},
        {name: 'type', label: 'Type', filter: true, searchable: true},
        {name: 'calories', label: 'Calories', numeric: true, format: NUMBER_FORMAT, sortable: true, hidden: false},
        {name: 'fat', label: 'Fat', unit: 'g', numeric: true, format: DECIMAL_FORMAT, sortable: true, searchable: true},
        {name: 'carbs', label: 'Carbs', unit: 'g', numeric: true, format: NUMBER_FORMAT, searchable: true},
        {name: 'protein', label: 'Protein', unit: 'g', numeric: true, format: DECIMAL_FORMAT, searchable: true},
        {name: 'sodium', label: 'Sodium', unit: 'mg', numeric: true, format: NUMBER_FORMAT, searchable: true},
        {name: 'calcium', label: 'Calcium', unit: '%', numeric: true, format: NUMBER_FORMAT, searchable: true},
        {name: 'iron', label: 'Iron', unit: '%', numeric: true, format: NUMBER_FORMAT, searchable: true},
    ];

    searching: boolean = false;

    data: any[] = [
        {
            'id': 1,
            'name': 'Frozen yogurt',
            'type': 'Ice cream',
            'calories': 159.0,
            'fat': 6.0,
            'carbs': 24.0,
            'protein': 4.0,
            'sodium': 87.0,
            'calcium': 14.0,
            'iron': 1.0,
            'comments': 'I love froyo!',
        }, {
            'id': 2,
            'name': 'Ice cream sandwich',
            'type': 'Ice cream',
            'calories': 237.0,
            'fat': 9.0,
            'carbs': 37.0,
            'protein': 4.3,
            'sodium': 129.0,
            'calcium': 8.0,
            'iron': 1.0,
        }, {
            'id': 3,
            'name': 'Eclair',
            'type': 'Pastry',
            'calories': 262.0,
            'fat': 16.0,
            'carbs': 24.0,
            'protein': 6.0,
            'sodium': 337.0,
            'calcium': 6.0,
            'iron': 7.0,
        }, {
            'id': 4,
            'name': 'Cupcake',
            'type': 'Pastry',
            'calories': 305.0,
            'fat': 3.7,
            'carbs': 67.0,
            'protein': 4.3,
            'sodium': 413.0,
            'calcium': 3.0,
            'iron': 8.0,
        }, {
            'id': 5,
            'name': 'Jelly bean',
            'type': 'Candy',
            'calories': 375.0,
            'fat': 0.0,
            'carbs': 94.0,
            'protein': 0.0,
            'sodium': 50.0,
            'calcium': 0.0,
            'iron': 0.0,
        }, {
            'id': 6,
            'name': 'Lollipop',
            'type': 'Candy',
            'calories': 392.0,
            'fat': 0.2,
            'carbs': 98.0,
            'protein': 0.0,
            'sodium': 38.0,
            'calcium': 0.0,
            'iron': 2.0,
        }, {
            'id': 7,
            'name': 'Honeycomb',
            'type': 'Other',
            'calories': 408.0,
            'fat': 3.2,
            'carbs': 87.0,
            'protein': 6.5,
            'sodium': 562.0,
            'calcium': 0.0,
            'iron': 45.0,
        }, {
            'id': 8,
            'name': 'Donut',
            'type': 'Pastry',
            'calories': 452.0,
            'fat': 25.0,
            'carbs': 51.0,
            'protein': 4.9,
            'sodium': 326.0,
            'calcium': 2.0,
            'iron': 22.0,
        }, {
            'id': 9,
            'name': 'KitKat',
            'type': 'Candy',
            'calories': 518.0,
            'fat': 26.0,
            'carbs': 65.0,
            'protein': 7.0,
            'sodium': 54.0,
            'calcium': 12.0,
            'iron': 6.0,
        }, {
            'id': 10,
            'name': 'Chocolate',
            'type': 'Candy',
            'calories': 518.0,
            'fat': 26.0,
            'carbs': 65.0,
            'protein': 7.0,
            'sodium': 54.0,
            'calcium': 12.0,
            'iron': 6.0,
        },
    ];
    selectable: boolean = true;
    clickable: boolean = true;
    multiple: boolean = false;

    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;
    selectedRows: any[] = [];

    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 5;
    sortBy: string = 'name';
    sortOrder: Direction = Direction.Descending;
    pageData: IPage = <IPage>{
        numberOfElements: 10,
        first: false,
        number: 0,
        size: 10,
        totalPages: 44,
        totalElements: 440,
        last: false,
        content: this.data
    };

    readOnly: boolean = false;

    actions: IDataTableRowAction[] = [
        <IDataTableRowAction>{
            name: 'edit',
            icon: 'mode_edit',
            title: '编辑',
            color: 'accent'
        },
        <IDataTableRowAction>{
            name: 'view',
            icon: 'remove_red_eye',
            title: '查看',
            color: 'accent'
        },
        <IDataTableRowAction>{
            name: 'delete',
            icon: 'delete_forever',
            title: '删除',
            color: 'accent'
        }
    ];
    searchItemAddition: boolean = true;

    items: string[] = [
        'stepper',
        'expansion-panel',
        'markdown',
        'highlight',
        'loading',
        'media',
        'chips',
        'http',
        'json-formatter',
        'pipes',
        'need more?',
    ];


    constructor(private _dataTableService: DataTableService) {
    }


    changeStatus() {
        this.editable = !this.editable;
    }

    logGuardian() {
        console.log(JSON.stringify(this._map));
    }

    addFunc($event): void {
        alert('ASB');
    }

    searchFunc(option: SearchOption): void {
        alert(option);
    }

    ngOnInit(): void {
        this.filter();
    }

    sort(sortEvent: IDataTableSortChangedEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        // this.currentPage = pagingEvent.page;
        // this.pageSize = pagingEvent.pageSize;
        this.filter();
    }

    filter(): void {
        let newData: any[] = this.data;
        const excludedColumns: string[] = this.columns
            .filter((column: IFieldDescriptor) => {
                return ((column.filter === undefined && column.hidden === true) ||
                (column.filter !== undefined && column.filter === false));
            }).map((column: IFieldDescriptor) => {
                return column.name;
            });
        newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
        this.filteredTotal = newData.length;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
    }

    toggleTooltips(): void {
        if (this.columns[0].tooltip) {
            this.columns.forEach((c: any) => delete c.tooltip);
        } else {
            this.columns.forEach((c: any) => c.tooltip = `This is ${c.label}!`);
        }
    }

    showAlert(row: any): void {
        // this._dialogService.openAlert({
        //     message: 'You clicked on row: ' + event.row.name,
        // });
    }

    performAction(rowAction: IDataTableRowActionPerformedEvent) {
        alert(rowAction.action.name + " " + rowAction.row.id);
    }

    onSearch(search: ISearchItem[] | string) {
        console.log(JSON.stringify(search));
    }

    showSearchBar() {
        this.searching = !this.searching;
    }
}
