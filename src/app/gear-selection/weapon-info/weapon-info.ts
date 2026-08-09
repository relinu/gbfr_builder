import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BuildContext } from '../../_services/build-context/build-context';
import { WeaponService } from '../../_services/weapon-service/weapon-service';
import { Weapon } from '../../_models/weapon-model';
import { TraitSelect } from '../../_components/trait-select/trait-select';

@Component({
  selector: 'app-weapon-info',
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, TraitSelect],
  templateUrl: './weapon-info.html',
  styleUrl: './weapon-info.css',
})
export class WeaponInfo implements OnInit {
  private build = inject(BuildContext);
  private weaponService = inject(WeaponService);

  readonly weaponTraitSlots = Array.from({ length: BuildContext.WEAPON_TRAIT_MAX_COUNT }, (_, i) => i);
  readonly imbuedTraitSlots = Array.from({ length: BuildContext.WEAPON_IMBUED_TRAIT_MAX_COUNT }, (_, i) => i);

  readonly weaponControl = new FormControl<string | null>(null);
  weaponTraitControls: FormControl<string | null>[] = [];
  imbuedTraitControls: FormControl<string | null>[] = [];

  public get weapon(): Weapon | undefined {
    return this.weaponService.get(this.build.weaponId);
  }

  public get availableWeapons(): Weapon[] {
    return this.weaponService.getAllFor(this.build.character);
  }

  ngOnInit(): void {
    this.weaponControl.setValue(this.build.weaponId);

    this.weaponControl.valueChanges.subscribe(v => {
      if (v) {
        this.build.weaponId = v;
        this.initTraitControls();
      }
    });

    this.initTraitControls();
  }

  private initTraitControls(): void {
    this.weaponTraitControls = this.weaponTraitSlots.map(i => {
      const control = new FormControl<string | null>(this.build.getWeaponTrait(i) ?? null);
      control.valueChanges.subscribe(v => this.build.setWeaponTrait(i, v ?? undefined));
      return control;
    });

    this.imbuedTraitControls = this.imbuedTraitSlots.map(i => {
      const control = new FormControl<string | null>(this.build.getImbuedTrait(i) ?? null);
      control.valueChanges.subscribe(v => this.build.setImbuedTrait(i, v ?? undefined));
      return control;
    });
  }
}