import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSelection } from './skill-selection';

describe('SkillSelection', () => {
  let component: SkillSelection;
  let fixture: ComponentFixture<SkillSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
