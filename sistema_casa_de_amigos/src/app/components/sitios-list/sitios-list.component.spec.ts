import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitiosListComponent } from './sitios-list.component';

describe('SitiosListComponent', () => {
  let component: SitiosListComponent;
  let fixture: ComponentFixture<SitiosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitiosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitiosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
