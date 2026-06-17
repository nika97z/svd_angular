import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Ss } from './ss/ss';
import { Webdev } from './webdev/webdev';
import { Automatization } from './automatization/automatization';
import { Chb } from './chb/chb';
import { Contact } from './contact/contact';
import { WorkProces } from './work-proces/work-proces';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'ss', component: Ss },
    { path: 'web-development', component: Webdev},
    { path: 'ai-automatization', component: Automatization},
    { path: 'chatbot', component: Chb},
    { path: 'contact', component: Contact}
];

