import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotePage } from './hote.page';

describe('HotePage', () => {
  let component: HotePage;
  let fixture: ComponentFixture<HotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
