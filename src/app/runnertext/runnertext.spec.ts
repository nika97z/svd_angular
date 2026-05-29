import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Runnertext } from './runnertext';

describe('Runnertext', () => {
  let component: Runnertext;
  let fixture: ComponentFixture<Runnertext>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Runnertext],
    }).compileComponents();

    fixture = TestBed.createComponent(Runnertext);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
