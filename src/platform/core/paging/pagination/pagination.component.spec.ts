import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgPaginationComponent } from './pagination.component';

describe('IgPaginationComponent', () => {
  let component: IgPaginationComponent;
  let fixture: ComponentFixture<IgPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
