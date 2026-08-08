import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BuildContext } from '../_services/build-context/build-context';
import { CharacterService } from '../_services/character-service/character-service';
import { WeaponService } from '../_services/weapon-service/weapon-service';
import { TraitService } from '../_services/trait-service/trait-service';
import { SkillService } from '../_services/skill-service/skill-service';
import { Character } from '../_models/character-model';
import { Weapon } from '../_models/weapon-model';
import { Sigil } from '../_models/sigil-model';
import { CharacterSelectDialog } from './character-select-dialog/character-select-dialog';

@Component({
  selector: 'app-overview',
  imports: [MatButtonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  private dialog = inject(MatDialog);
  private build = inject(BuildContext);
  private characterService = inject(CharacterService);
  private weaponService = inject(WeaponService);
  private traitService = inject(TraitService);
  private skillService = inject(SkillService);

  readonly sigilIds = Array.from({ length: BuildContext.SIGIL_MAX_COUNT }, (_, i) => i);
  readonly skillIds = Array.from({ length: BuildContext.SKILL_MAX_COUNT }, (_, i) => i);

  public get character(): Character | undefined {
    return this.characterService.get(this.build.character);
  }

  public get weapon(): Weapon | undefined {
    return this.weaponService.get(this.build.weaponId);
  }

  public getSigil(id: number): Sigil | undefined {
    return this.build.getSigil(id);
  }

  public getTraitName(traitId: string | undefined): string {
    if (!traitId) return '-';
    const trait = this.traitService.get(traitId);
    return trait ? trait.name : '-';
  }

  public getSkillName(id: number): string {
    const skillId = this.build.getSkill(id);
    if (!skillId) return '-';
    const skill = this.skillService.get(skillId);
    return skill ? skill.name : '-';
  }

  public openCharacterDialog(): void {
    const dialogRef = this.dialog.open(CharacterSelectDialog, { width: '400px' });
    dialogRef.afterClosed().subscribe((characterId: string | undefined) => {
      if (characterId) {
        this.build.character = characterId;
      }
    });
  }
}