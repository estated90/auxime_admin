import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHotePage } from './create-hote.page';

describe('CreateHotePage', () => {
  let component: CreateHotePage;
  let fixture: ComponentFixture<CreateHotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
