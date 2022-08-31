import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsCapePage } from './contrats-cape.page';

describe('ContratsCapePage', () => {
  let component: ContratsCapePage;
  let fixture: ComponentFixture<ContratsCapePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratsCapePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratsCapePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
