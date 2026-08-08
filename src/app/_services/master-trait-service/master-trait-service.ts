import { Service } from '@angular/core';
import { BaseDataService } from '../base-data-service/base-data-service';
import { MasterTrait } from '../../_models/master-trait-model';

@Service()
export class MasterTraitService extends BaseDataService<MasterTrait> {
    constructor() {
        super('/_data/master-traits.json');
    }

    public getAllFor(characterId: string): MasterTrait[] {
        return this.getAll().filter(t => t.charaID == characterId);
    }
}