import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigilInfo } from './sigil-info';

describe('SigilInfo', () => {
  let component: SigilInfo;
  let fixture: ComponentFixture<SigilInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigilInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(SigilInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
