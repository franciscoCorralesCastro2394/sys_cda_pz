import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsFormComponent } from './view-details-form.component';

describe('ViewDetailsFormComponent', () => {
  let component: ViewDetailsFormComponent;
  let fixture: ComponentFixture<ViewDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
