import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KazneFormComponent } from './kazne-form.component';

describe('KazneForm', () => {
  let component: KazneFormComponent;
  let fixture: ComponentFixture<KazneFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KazneFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KazneFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
