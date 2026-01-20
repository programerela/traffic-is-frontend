import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviListComponent } from './zahtevi-list.component';

describe('ZahteviListComponent', () => {
  let component: ZahteviListComponent;
  let fixture: ComponentFixture<ZahteviListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZahteviListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahteviListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
