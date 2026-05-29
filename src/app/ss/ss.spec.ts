import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ss } from './ss';

describe('Ss', () => {
  let component: Ss;
  let fixture: ComponentFixture<Ss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ss],
    }).compileComponents();

    fixture = TestBed.createComponent(Ss);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
