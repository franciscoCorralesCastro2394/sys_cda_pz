import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitioSeguidoComponent } from './sitio-seguido.component';

describe('SitioSeguidoComponent', () => {
  let component: SitioSeguidoComponent;
  let fixture: ComponentFixture<SitioSeguidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitioSeguidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitioSeguidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
