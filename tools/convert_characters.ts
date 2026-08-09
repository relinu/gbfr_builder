import { Character } from '../src/app/_models/character-model';
import fs from 'node:fs';

const file = fs.readFileSync('./tools/assets/characters.json');
const _characters = JSON.parse(file);

const map: Map<String, Character> = new Map();

_characters.forEach(c => {
    var id = Number(c.id);

    if(id == 1)
        return;
    else if(id > 0)
        id -= 1;

    const mapped: Character = {
        id: id.toString(),
        name: c.name,
        portrait: c.portrait,
    };

    map.set(id.toString(), mapped);
});

const filePath = `./public/_data/characters.json`;
fs.writeFileSync(filePath, JSON.stringify([...map.values()]));
