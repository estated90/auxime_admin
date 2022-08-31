import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraddPage } from './useradd.page';

describe('UseraddPage', () => {
  let component: UseraddPage;
  let fixture: ComponentFixture<UseraddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
