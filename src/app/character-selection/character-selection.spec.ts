import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelection } from './character-selection';

describe('CharacterSelection', () => {
  let component: CharacterSelection;
  let fixture: ComponentFixture<CharacterSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
