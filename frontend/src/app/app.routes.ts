import { Routes } from '@angular/router';
import { OsDashboard } from './os-dashboard/os-dashboard';

export const routes: Routes = [{
  path: 'app',
  children: [
    {
      path: 'home',
      component: OsDashboard
    },
    {
      path: '**',
      redirectTo: '/app/home'
    }
  ],
}, { path: '**', redirectTo: 'app/home' }];
