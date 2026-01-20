import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VozilaFormComponent } from './vozila-form.component';

describe('VozilaForm', () => {
  let component: VozilaFormComponent;
  let fixture: ComponentFixture<VozilaFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VozilaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VozilaFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
