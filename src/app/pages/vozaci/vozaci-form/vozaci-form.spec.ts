import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VozaciForm } from './vozaci-form';

describe('VozaciForm', () => {
  let component: VozaciForm;
  let fixture: ComponentFixture<VozaciForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VozaciForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VozaciForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
