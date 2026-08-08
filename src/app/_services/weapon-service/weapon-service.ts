import { Service } from '@angular/core';
import { BaseDataService } from '../base-data-service/base-data-service';
import { Weapon } from '../../_models/weapon-model';

@Service()
export class WeaponService extends BaseDataService<Weapon> {
    constructor() {
        super('/_data/weapons.json');
    }

    public getAllFor(characterId: string): Weapon[] {
        console.log(this.getAll());
        return this.getAll().filter(w => w.charaID == characterId);
    }
}
