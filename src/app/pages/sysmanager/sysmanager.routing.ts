import { Routes, RouterModule } from '@angular/router';
import { SysmanagerMain } from './sysmanager.main';
import { AuthGuard } from '../auth-guard';
import {
  RolelistComponent,
  UserlistComponent,
  EnumerationComponent,
  CompanymanageComponent,
  ModulemanagerComponent
} from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SysmanagerMain,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'rolelist', component: RolelistComponent },
      { path: 'userlist', component: UserlistComponent },
      { path: 'enumeration', component: EnumerationComponent },
      { path: 'companymanage', component: CompanymanageComponent },
      { path: 'modulemanager', component: ModulemanagerComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
