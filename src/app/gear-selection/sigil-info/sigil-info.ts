import { Component, inject, input, OnChanges } from '@angular/core';
import { TraitService } from '../../_services/trait-service/trait-service';
import { BuildContext } from '../../_services/build-context/build-context';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TraitSelect } from "../../_components/trait-select/trait-select";

@Component({
  selector: 'app-sigil-info',
  imports: [FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, TraitSelect],
  templateUrl: './sigil-info.html',
  styleUrl: './sigil-info.css',
})
export class SigilInfo implements OnChanges {
  private build = inject(BuildContext);
  public traitService = inject(TraitService);
  readonly sigilId = input.required<number>();

  readonly mainTraitControl = new FormControl<string | null>(null);
  readonly subTraitControl = new FormControl<string | null>({ value: null, disabled: true });

  constructor() {
    this.mainTraitControl.valueChanges.subscribe(v => {
      if (v == null) {
        this.subTraitControl.setValue(null);
        this.subTraitControl.disable();
      } else {
        this.subTraitControl.enable();
      }

      this.updateSigil();
    });

    this.subTraitControl.valueChanges.subscribe(_ => this.updateSigil());
  }

  ngOnChanges(): void {
    const sigil = this.build.getSigil(this.sigilId());
    this.mainTraitControl.setValue(sigil?.main ?? null);
    this.subTraitControl.setValue(sigil?.sub ?? null);
  }

  private updateSigil() {
    const sigilId = this.sigilId();
    this.build.setSigil(sigilId, {
      main: this.mainTraitControl.value ?? undefined,
      sub: this.subTraitControl.value ?? undefined,
    });
  }
}
