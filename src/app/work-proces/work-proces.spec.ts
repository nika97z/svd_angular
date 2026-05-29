import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProces } from './work-proces';

describe('WorkProces', () => {
  let component: WorkProces;
  let fixture: ComponentFixture<WorkProces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkProces],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkProces);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
