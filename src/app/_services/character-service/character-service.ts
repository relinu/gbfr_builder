import { Service } from '@angular/core';
import { BaseDataService } from '../base-data-service/base-data-service';
import { Character } from '../../_models/character-model';

@Service()
export class CharacterService extends BaseDataService<Character> {
    constructor() {
        super('/_data/characters.json');
    }
}