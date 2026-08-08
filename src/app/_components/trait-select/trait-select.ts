import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { TraitService } from '../../_services/trait-service/trait-service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Trait } from '../../_models/trait-model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'trait-select',
  imports: [FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './trait-select.html',
  styleUrl: './trait-select.css',
})
export class TraitSelect {
  private traitService = inject(TraitService);

  readonly label = input.required<string>();
  readonly traitControl = input.required<FormControl<string | null>>();
  readonly traitInput = viewChild.required<ElementRef<HTMLInputElement>>('traitInput');

  public displayTrait(traitId: string | null): string {
    var trait;
    if (traitId)
      trait = this.traitService.get(traitId);

    return trait ? trait.name : '';
  }

  public filter(): Trait[] {
    const options = this.traitService.getAll();
    const mainValue = this.traitInput().nativeElement.value.toLowerCase();
    return options.filter(o => o.name.toLowerCase().includes(mainValue));
  }
}
