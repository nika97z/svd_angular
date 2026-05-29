import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Ss } from './ss/ss';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'ss', component: Ss },
];

