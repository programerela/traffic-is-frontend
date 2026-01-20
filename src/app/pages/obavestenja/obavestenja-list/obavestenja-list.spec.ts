import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjaListComponent } from './obavestenja-list.component';

describe('ObavestenjaListComponent', () => {
  let component: ObavestenjaListComponent;
  let fixture: ComponentFixture<ObavestenjaListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObavestenjaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObavestenjaListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
