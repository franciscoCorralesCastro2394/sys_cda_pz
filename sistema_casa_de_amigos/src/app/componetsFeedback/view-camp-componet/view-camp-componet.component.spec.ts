import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampComponetComponent } from './view-camp-componet.component';

describe('ViewCampComponetComponent', () => {
  let component: ViewCampComponetComponent;
  let fixture: ComponentFixture<ViewCampComponetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCampComponetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCampComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
