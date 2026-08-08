import { Character, ElementalType } from '../src/app/_models/character-model';
import fs from 'node:fs';

const file = fs.readFileSync('./tools/assets/characters.json');
const _characters = JSON.parse(file);

const characters = _characters.map(c => {
    const mapped: Character = {
        id: c.id,
        name: c.name,
        portrait: c.portrait,
        element: c.element as ElementalType,
        baseHP: Number(c.baseHP),
        HP: Number(c.HP),
        baseATK: Number(c.baseATK),
        ATK: Number(c.ATK),
        baseStun: Number(c.baseStun),
        baseCrit: Number(c.baseCrit),
        passives: [
            {
                name: c.passive1name,
                description: c.passive1text
            },
            {
                name: c.passive2name,
                description: c.passive2text
            }
        ]
    };

    return mapped;
});

const filePath = `./public/_data/characters.json`;
fs.writeFileSync(filePath, JSON.stringify(characters));
