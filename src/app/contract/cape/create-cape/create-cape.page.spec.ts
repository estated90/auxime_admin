import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCapePage } from './create-cape.page';

describe('CreateCapePage', () => {
  let component: CreateCapePage;
  let fixture: ComponentFixture<CreateCapePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCapePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCapePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
