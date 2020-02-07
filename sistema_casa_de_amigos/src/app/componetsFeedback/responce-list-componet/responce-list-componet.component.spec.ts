import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponceListComponetComponent } from './responce-list-componet.component';

describe('ResponceListComponetComponent', () => {
  let component: ResponceListComponetComponent;
  let fixture: ComponentFixture<ResponceListComponetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponceListComponetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponceListComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
