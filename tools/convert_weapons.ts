import { Weapon } from '../src/app/_models/weapon-model';
import fs from 'node:fs';

const file = fs.readFileSync('./tools/assets/weapons.json');
const _weapons = JSON.parse(file);

const map: Map<String, Weapon> = new Map();

_weapons.forEach(w => {
    var _charaID = Number(w.charaID);
    if (_charaID == 0)
        return;
    else if (_charaID > 0)
        _charaID -= 1;

    const id: string = w.name
        .replaceAll(' ', '_')
        .replace(/[^a-zA-Z0-9_]/g, '')
        .toLowerCase();

    const mapped: Weapon = {
        id: id,
        charaID: _charaID.toString(),
        name: w.name,
        series: w.series,
        icon: w.icon,
        image: w.image,
    };

    map.set(id, mapped);
});

const filePath = `./public/_data/weapons.json`;
fs.writeFileSync(filePath, JSON.stringify([...map.values()]));
