import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Webdev } from './webdev/webdev';
import { Automatization } from './automatization/automatization';
import { Chb } from './chb/chb';
import { Contact } from './contact/contact';
import { Udesing } from './udesing/udesing';


export const routes: Routes = [
    { path: '', component: Main },
    { path: 'web-development', component: Webdev},
    { path: 'ai-automatization', component: Automatization},
    { path: 'chatbot', component: Chb},
    { path: 'contact', component: Contact},
    { path: 'ui/ux_design', component: Udesing},
];

