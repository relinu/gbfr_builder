import { Component, inject } from '@angular/core';
import { BuildContext } from '../../_services/build-context/build-context';
import { WeaponService } from '../../_services/weapon-service/weapon-service';
import { Weapon } from '../../_models/weapon-model';

@Component({
  selector: 'app-weapon-info',
  imports: [],
  templateUrl: './weapon-info.html',
  styleUrl: './weapon-info.css',
})
export class WeaponInfo {
  private build = inject(BuildContext);
  private weaponService = inject(WeaponService);

  public get weapon(): Weapon | undefined {
    return this.weaponService.get(this.build.weaponId);
  }
}
