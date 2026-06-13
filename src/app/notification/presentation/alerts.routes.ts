import { Routes } from '@angular/router';

const alerts = () => import('./views/alerts/alerts').then((m) => m.Alerts);

export const alertsRoutes: Routes = [
  { path: '', loadComponent: alerts, title: 'TankIQ - Alerts' },
];
