import { Routes } from '@angular/router';
import { Overview } from './overview/overview';
import { GearSelection } from './gear-selection/gear-selection';
import { SkillSelection } from './skill-selection/skill-selection';

export const routes: Routes = [
    { path: '', component: Overview },
    { path: 'gear', component: GearSelection },
    { path: 'skills', component: SkillSelection }
];
