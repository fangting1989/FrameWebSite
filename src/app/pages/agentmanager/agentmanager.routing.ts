import { Routes, RouterModule } from '@angular/router';
import { CbdkMain } from './agentmanager.main';
import { AgentlistComponent } from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CbdkMain,
    children: [
      { path: '', redirectTo: 'agentlist' },
      { path: 'agentlist', component: AgentlistComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
