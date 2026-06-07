import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chb } from './chb';

describe('Chb', () => {
  let component: Chb;
  let fixture: ComponentFixture<Chb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chb],
    }).compileComponents();

    fixture = TestBed.createComponent(Chb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
