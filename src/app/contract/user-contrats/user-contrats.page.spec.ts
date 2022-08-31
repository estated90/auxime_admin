import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContratsPage } from './user-contrats.page';

describe('UserContratsPage', () => {
  let component: UserContratsPage;
  let fixture: ComponentFixture<UserContratsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContratsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContratsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
