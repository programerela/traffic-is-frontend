import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalitikaComponent } from './analitika.component';

describe('Analitika', () => {
  let component: AnalitikaComponent;
  let fixture: ComponentFixture<AnalitikaComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalitikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalitikaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
