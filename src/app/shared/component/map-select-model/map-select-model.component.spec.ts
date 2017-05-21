/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapSelectModelComponent } from './map-select-model.component';

describe('MapSelectModelComponent', () => {
    let component: MapSelectModelComponent;
    let fixture: ComponentFixture<MapSelectModelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapSelectModelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapSelectModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
