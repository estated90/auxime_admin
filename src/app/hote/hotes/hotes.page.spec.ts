import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotesPage } from './hotes.page';

describe('HotesPage', () => {
  let component: HotesPage;
  let fixture: ComponentFixture<HotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
