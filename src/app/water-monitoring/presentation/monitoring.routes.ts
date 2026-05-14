import { Routes } from '@angular/router';

const monitoring = () =>
  import('./views/monitoring/monitoring').then((m) => m.Monitoring);

export const monitoringRoutes: Routes = [
  { path: '', loadComponent: monitoring, title: 'TankIQ - Monitoring' },
];
