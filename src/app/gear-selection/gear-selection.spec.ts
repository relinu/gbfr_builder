import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearSelection } from './gear-selection';

describe('GearSelection', () => {
  let component: GearSelection;
  let fixture: ComponentFixture<GearSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(GearSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
