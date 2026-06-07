import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atom } from './atom';

describe('Atom', () => {
  let component: Atom;
  let fixture: ComponentFixture<Atom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atom],
    }).compileComponents();

    fixture = TestBed.createComponent(Atom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
