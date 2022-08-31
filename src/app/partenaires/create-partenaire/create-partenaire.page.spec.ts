import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartenairePage } from './create-partenaire.page';

describe('CreatePartenairePage', () => {
  let component: CreatePartenairePage;
  let fixture: ComponentFixture<CreatePartenairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePartenairePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePartenairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
