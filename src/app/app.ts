import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterModule } from '@angular/router';
import { BuildContext } from './_services/build-context/build-context';
import { CharacterService } from './_services/character-service/character-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private characterService = inject(CharacterService);
  private buildContext = inject(BuildContext);

  public getCharacterName(): string {
    const characterId = this.buildContext.character;
    const currentCharacter = this.characterService.get(characterId);
    return currentCharacter?.name ?? '';
  }
}
