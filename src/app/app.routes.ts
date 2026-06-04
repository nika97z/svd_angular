import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Ss } from './ss/ss';
import { Webdev } from './webdev/webdev';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'ss', component: Ss },
    { path: 'web-development', component: Webdev}
];

