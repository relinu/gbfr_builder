import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { CharacterService } from '../../_services/character-service/character-service';
import { Character } from '../../_models/character-model';

@Component({
  selector: 'app-character-select-dialog',
  imports: [MatDialogModule, MatListModule],
  templateUrl: './character-select-dialog.html',
  styleUrl: './character-select-dialog.css',
})
export class CharacterSelectDialog {
  private characterService = inject(CharacterService);
  private dialogRef = inject(MatDialogRef<CharacterSelectDialog>);

  public getCharacters(): Character[] {
    return this.characterService.getAll();
  }

  public select(character: Character): void {
    this.dialogRef.close(character.id);
  }
}