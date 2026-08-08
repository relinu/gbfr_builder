import { Component, inject, signal } from '@angular/core';
import { BuildContext } from '../_services/build-context/build-context';
import { WeaponInfo } from "./weapon-info/weapon-info";
import { SigilInfo } from './sigil-info/sigil-info';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Sigil } from '../_models/sigil-model';
import { TraitService } from '../_services/trait-service/trait-service';
import { WeaponService } from '../_services/weapon-service/weapon-service';

type SelectionType = ["weapon"] | ["sigil", number];

@Component({
  selector: 'app-gear-selection',
  imports: [WeaponInfo, SigilInfo, MatListModule, MatButtonModule],
  templateUrl: './gear-selection.html',
  styleUrl: './gear-selection.css',
})
export class GearSelection {
  private build = inject(BuildContext);
  private weaponService = inject(WeaponService);
  private traitService = inject(TraitService);

  readonly selection = signal<SelectionType>(["weapon"]);

  public getSigil(id: number): Sigil | undefined {
    return this.build.getSigil(id);
  }

  public isSelected(tselection: SelectionType): boolean {
    const [curType, curId] = this.selection();
    const [type, id] = tselection;
    return curType == type && curId == id;
  }

  public getWeaponName(): string {
    const weapon = this.weaponService.get(this.build.weaponId);
    return weapon ? weapon.name : '-';
  }

  public getTraitName(traitId: string | undefined): string {
    var trait;
    if (traitId)
      trait = this.traitService.get(traitId);

    return trait ? trait.name : '-';
  }
}
