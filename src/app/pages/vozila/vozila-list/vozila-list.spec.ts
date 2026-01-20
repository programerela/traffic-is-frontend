import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VozilaListComponent } from './vozila-list.component';

describe('VozilaListComponent', () => {
  let component: VozilaListComponent;
  let fixture: ComponentFixture<VozilaListComponent>; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VozilaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VozilaListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
