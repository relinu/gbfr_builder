import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponInfo } from './weapon-info';

describe('WeaponInfo', () => {
  let component: WeaponInfo;
  let fixture: ComponentFixture<WeaponInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(WeaponInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
