import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTraits } from './master-traits';

describe('MasterTraits', () => {
  let component: MasterTraits;
  let fixture: ComponentFixture<MasterTraits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterTraits],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterTraits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});