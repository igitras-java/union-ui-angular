import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgActionBarComponent } from './action-bar.component';

describe('IgActionBarComponent', () => {
  let component: IgActionBarComponent;
  let fixture: ComponentFixture<IgActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgActionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
