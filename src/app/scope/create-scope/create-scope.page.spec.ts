import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScopePage } from './create-scope.page';

describe('CreateScopePage', () => {
  let component: CreateScopePage;
  let fixture: ComponentFixture<CreateScopePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScopePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScopePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
