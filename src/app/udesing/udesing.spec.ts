import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Udesing } from './udesing';

describe('Udesing', () => {
  let component: Udesing;
  let fixture: ComponentFixture<Udesing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Udesing],
    }).compileComponents();

    fixture = TestBed.createComponent(Udesing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
