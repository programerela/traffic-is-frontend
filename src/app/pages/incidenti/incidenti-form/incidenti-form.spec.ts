import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentiFormComponent } from './incidenti-form.component';

describe('IncidentiFormComponent', () => {
  let component: IncidentiFormComponent;
  let fixture: ComponentFixture<IncidentiFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentiFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentiFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
