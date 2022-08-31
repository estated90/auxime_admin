import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopesPage } from './scopes.page';

describe('ScopesPage', () => {
  let component: ScopesPage;
  let fixture: ComponentFixture<ScopesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
