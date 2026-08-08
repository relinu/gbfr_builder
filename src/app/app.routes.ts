import { Routes } from '@angular/router';
import { CharacterSelection } from './character-selection/character-selection';
import { Overview } from './overview/overview';
import { GearSelection } from './gear-selection/gear-selection';
import { SkillSelection } from './skill-selection/skill-selection';

export const routes: Routes = [
    { path: '', component: Overview },
    { path: 'characters', component: CharacterSelection },
    { path: 'gear', component: GearSelection },
    { path: 'skills', component: SkillSelection }
];
