import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VozaciDetail } from './vozaci-detail';

describe('VozaciDetail', () => {
  let component: VozaciDetail;
  let fixture: ComponentFixture<VozaciDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VozaciDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VozaciDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
