import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryaddPage } from './categoryadd.page';

describe('CategoryaddPage', () => {
  let component: CategoryaddPage;
  let fixture: ComponentFixture<CategoryaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
