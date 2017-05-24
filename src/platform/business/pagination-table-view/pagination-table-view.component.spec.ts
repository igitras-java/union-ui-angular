import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationTableViewComponent } from './pagination-table-view.component';

describe('PaginationTableViewComponent', () => {
  let component: PaginationTableViewComponent;
  let fixture: ComponentFixture<PaginationTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
