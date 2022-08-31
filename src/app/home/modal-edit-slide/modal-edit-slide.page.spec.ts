import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditSlidePage } from './modal-edit-slide.page';

describe('ModalEditSlidePage', () => {
  let component: ModalEditSlidePage;
  let fixture: ComponentFixture<ModalEditSlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditSlidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditSlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
