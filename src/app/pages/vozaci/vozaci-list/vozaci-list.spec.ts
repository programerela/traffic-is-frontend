import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VozaciList } from './vozaci-list';

describe('VozaciList', () => {
  let component: VozaciList;
  let fixture: ComponentFixture<VozaciList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VozaciList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VozaciList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
