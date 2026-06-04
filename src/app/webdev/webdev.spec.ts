import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webdev } from './webdev';

describe('Webdev', () => {
  let component: Webdev;
  let fixture: ComponentFixture<Webdev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Webdev],
    }).compileComponents();

    fixture = TestBed.createComponent(Webdev);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
