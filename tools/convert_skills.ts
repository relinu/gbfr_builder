import { Skill } from '../src/app/_models/skill-model';
import fs from 'node:fs';

const file = fs.readFileSync('./tools/assets/skills.json');
const _skills = JSON.parse(file);

const map: Map<String, Skill> = new Map();

_skills.forEach(s => {
    var _charaID = Number(s.charaID);
    if(_charaID == 0)
        return;
    else if(_charaID > 0)
        _charaID -= 1;

    const id: string = s.name
        .replaceAll(' ', '_')
        .replace(/[^a-zA-Z0-9_]/g, '')
        .toLowerCase();

    const mapped: Skill = {
        id: id,
        charaID: _charaID.toString(),
        name: s.name,
        icon: s.icon,
    };

    map.set(id, mapped);
});

const filePath = `./public/_data/skills.json`;
fs.writeFileSync(filePath, JSON.stringify([...map.values()]));
