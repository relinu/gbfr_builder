import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitSelect } from './trait-select';

describe('TraitSelect', () => {
  let component: TraitSelect;
  let fixture: ComponentFixture<TraitSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraitSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(TraitSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
