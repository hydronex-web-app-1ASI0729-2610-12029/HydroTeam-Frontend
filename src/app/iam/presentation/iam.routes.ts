import { Routes } from '@angular/router';

const login = () => import('./views/login/login').then((m) => m.Login);

export const iamRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: login, title: 'TankIQ - Login' },
];
