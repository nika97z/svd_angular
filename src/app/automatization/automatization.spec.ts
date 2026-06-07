import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automatization } from './automatization';

describe('Automatization', () => {
  let component: Automatization;
  let fixture: ComponentFixture<Automatization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Automatization],
    }).compileComponents();

    fixture = TestBed.createComponent(Automatization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
