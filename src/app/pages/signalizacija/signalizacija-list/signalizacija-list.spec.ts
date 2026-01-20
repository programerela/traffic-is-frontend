import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalizacijaListComponent } from './signalizacija-list.component';

describe('SignalizacijaListComponent', () => {
  let component: SignalizacijaListComponent;
  let fixture: ComponentFixture<SignalizacijaListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalizacijaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalizacijaListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
