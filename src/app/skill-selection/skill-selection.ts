import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BuildContext } from '../_services/build-context/build-context';
import { SkillService } from '../_services/skill-service/skill-service';
import { Skill } from '../_models/skill-model';

@Component({
  selector: 'app-skill-selection',
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './skill-selection.html',
  styleUrl: './skill-selection.css',
})
export class SkillSelection implements OnInit {
  private build = inject(BuildContext);
  private skillService = inject(SkillService);

  readonly slots = Array.from({ length: BuildContext.SKILL_MAX_COUNT }, (_, i) => i);

  controls: FormControl<string | null>[] = [];
  availableSkills: Skill[] = [];

  ngOnInit(): void {
    const characterId = this.build.character;
    this.availableSkills = this.skillService.getAllFor(characterId);

    this.controls = this.slots.map((i) => {
      const control = new FormControl<string | null>(this.build.getSkill(i) ?? null);
      control.valueChanges.subscribe((v) => this.build.setSkill(i, v ?? undefined));
      return control;
    });
  }

  public isSelectedElsewhere(skillId: string, currentSlot: number): boolean {
    return this.controls.some((c, i) => i !== currentSlot && c.value === skillId);
  }
}