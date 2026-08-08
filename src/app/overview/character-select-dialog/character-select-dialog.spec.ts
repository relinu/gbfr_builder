import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { CharacterSelectDialog } from './character-select-dialog';

describe('CharacterSelectDialog', () => {
  let component: CharacterSelectDialog;
  let fixture: ComponentFixture<CharacterSelectDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSelectDialog],
      providers: [{ provide: MatDialogRef, useValue: { close: () => {} } }],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSelectDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});