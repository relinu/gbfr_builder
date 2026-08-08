import { Skill } from '../src/app/_models/skill-model';
import fs from 'node:fs';

const file = fs.readFileSync('./tools/assets/skills.json');
const _skills = JSON.parse(file);

const map: Map<String, Skill> = new Map();

_skills.forEach(s => {
    const id: string = s.name
        .replaceAll(' ', '_')
        .replace(/[^a-zA-Z0-9_]/g, '')
        .toLowerCase();

    const mapped: Skill = {
        id: id,
        charaID: s.charaID,
        name: s.name,
        description: s.description,
        icon: s.icon,
    };

    map.set(id, mapped);
});

const filePath = `./public/_data/skills.json`;
fs.writeFileSync(filePath, JSON.stringify([...map.values()]));
