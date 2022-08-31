import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopePage } from './scope.page';

describe('ScopePage', () => {
  let component: ScopePage;
  let fixture: ComponentFixture<ScopePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
