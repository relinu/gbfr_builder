import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MasterTraitService } from '../_services/master-trait-service/master-trait-service';
import { BuildContext } from '../_services/build-context/build-context';
import { MasterStyle, MasterTrait } from '../_models/master-trait-model';

interface RankGroup {
  rank: number;
  traits: MasterTrait[];
  activeCount: number;
}

@Component({
  selector: 'app-master-traits',
  imports: [MatCheckboxModule, MatTabsModule],
  templateUrl: './master-traits.html',
  styleUrl: './master-traits.css',
})
export class MasterTraits {
  private masteryTraitService = inject(MasterTraitService);
  private build = inject(BuildContext);

  readonly styles: MasterStyle[] = ['Insight', 'Essence', 'Crux'];

  public getRanks(style: MasterStyle): RankGroup[] {
    const traits = this.masteryTraitService.getAllFor(this.build.character)
      .filter(t => t.style === style)
      .sort((a, b) => a.rank - b.rank);

    const ranks = [...new Set(traits.map(t => t.rank))].sort((a, b) => a - b);

    return ranks.map(rank => {
      const rankTraits = traits.filter(t => t.rank === rank);
      return {
        rank,
        traits: rankTraits,
        activeCount: rankTraits.filter(t => this.build.hasMasterTrait(t.id)).length,
      };
    });
  }

  public getActiveCountForStyle(style: MasterStyle): number {
    return this.masteryTraitService.getAllFor(this.build.character)
      .filter(t => t.style === style && this.build.hasMasterTrait(t.id))
      .length;
  }

  public isActive(traitId: string): boolean {
    return this.build.hasMasterTrait(traitId);
  }

  public toggle(traitId: string, active?: boolean): void {
    if (active == undefined) {
      active = !this.isActive(traitId);
    }

    this.build.toggleMasterTrait(traitId, active);
  }
}