import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSitioComponent } from './edit-sitio.component';

describe('EditSitioComponent', () => {
  let component: EditSitioComponent;
  let fixture: ComponentFixture<EditSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
