import { Routes, RouterModule } from '@angular/router';
import { CbdkMain } from './moneymanager.main';
import { MoneyComponent } from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CbdkMain,
    children: [
      { path: '', redirectTo: 'money' },
      { path: 'money', component: MoneyComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
