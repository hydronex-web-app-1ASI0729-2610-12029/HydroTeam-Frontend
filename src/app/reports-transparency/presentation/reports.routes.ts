import { Routes } from '@angular/router';

const reports = () => import('./views/reports/reports').then((m) => m.Reports);

export const reportsRoutes: Routes = [
  { path: '', loadComponent: reports, title: 'TankIQ - Reports' },
];
