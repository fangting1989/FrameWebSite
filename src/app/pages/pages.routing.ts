import { Routes, RouterModule, CanLoad } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './auth-guard';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'agent', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
      { path: 'sysmanager', loadChildren: './sysmanager/sysmanager.module#SysmanagerModule', canActivate: [AuthGuard] },
      { path: 'agent', loadChildren: './agentmanager/agentmanager.module#AgentManagerModule', canActivate: [AuthGuard] },
      { path: 'money', loadChildren: './moneymanager/moneymanager.module#MoneyManagerModule', canActivate: [AuthGuard] },
      { path: 'ticket', loadChildren: './ticketmanager/ticketmanager.module#TicketManagerModule', canActivate: [AuthGuard] }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
