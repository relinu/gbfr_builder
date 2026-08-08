import { Service } from '@angular/core';
import { BaseDataService } from '../base-data-service/base-data-service';
import { Trait } from '../../_models/trait-model';

@Service()
export class TraitService extends BaseDataService<Trait> {
    constructor() {
        super('/_data/traits.json');
    }
}

