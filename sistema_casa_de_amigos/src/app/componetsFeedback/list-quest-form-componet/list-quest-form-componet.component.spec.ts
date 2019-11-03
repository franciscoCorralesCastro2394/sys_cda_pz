import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestFormComponetComponent } from './list-quest-form-componet.component';

describe('ListQuestFormComponetComponent', () => {
  let component: ListQuestFormComponetComponent;
  let fixture: ComponentFixture<ListQuestFormComponetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuestFormComponetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestFormComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
