import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratCapePage } from './contrat-cape.page';

describe('ContratCapePage', () => {
  let component: ContratCapePage;
  let fixture: ComponentFixture<ContratCapePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratCapePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratCapePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
