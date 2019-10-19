import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarSitiosComponent } from './buscar-sitios.component';

describe('BuscarSitiosComponent', () => {
  let component: BuscarSitiosComponent;
  let fixture: ComponentFixture<BuscarSitiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarSitiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarSitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
