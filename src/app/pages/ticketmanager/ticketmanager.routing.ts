import { Routes, RouterModule } from '@angular/router';
import { CbdkMain } from './ticketmanager.main';
import { TicketComponent,TicketeditComponent } from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CbdkMain,
    children: [
      {  path: '', redirectTo: 'ticket' },
      { path: 'ticket', component: TicketComponent },
      { path: 'ticketedit', component: TicketeditComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
