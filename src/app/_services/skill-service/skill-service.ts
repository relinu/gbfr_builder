import { Service } from '@angular/core';
import { BaseDataService } from '../base-data-service/base-data-service';
import { Skill } from '../../_models/skill-model';

@Service()
export class SkillService extends BaseDataService<Skill> {
    constructor() {
        super('/_data/skills.json');
    }

    public getAllFor(characterId: string): Skill[] {
        return this.getAll().filter(s => s.charaID == characterId);
    }
}