import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentiListComponent } from './incidenti-list.component';

describe('IncidentiListComponent', () => {
  let component: IncidentiListComponent;
  let fixture: ComponentFixture<IncidentiListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentiListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
