import { Component, inject } from '@angular/core';
import { BuildContext } from '../_services/build-context/build-context';
import { CharacterService } from '../_services/character-service/character-service';
import { Character } from '../_models/character-model';

@Component({
  selector: 'app-character-selection',
  imports: [],
  templateUrl: './character-selection.html',
  styleUrl: './character-selection.css',
})
export class CharacterSelection {
  private characterService = inject(CharacterService);
  private buildContext = inject(BuildContext);

  public getCharacters(): Character[] {
    return this.characterService.getAll();
  }

  public selectCharacter(character: any) {
    this.buildContext.characterId = character.id;
  }
}
