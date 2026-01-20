import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KazneListComponent } from './kazne-list.component';

describe('KazneListComponent', () => {
  let component: KazneListComponent;
  let fixture: ComponentFixture<KazneListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KazneListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KazneListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
