import { Routes } from '@angular/router';
import { Home } from './landing/presentation/views/home/home';
import { Layout } from './landing/presentation/components/layout/layout';
import { DashboardLayout } from './shared/presentation/layouts/dashboard-layout/dashboard-layout';

const about = () => import('./landing/presentation/views/about/about').then((m) => m.About);
const pageNotFound = () => import('./landing/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const placeholder = () => import('./shared/presentation/views/placeholder/placeholder').then((m) => m.Placeholder);
const iamRoutes = () => import('./iam/presentation/iam.routes').then((m) => m.iamRoutes);
const dashboardRoutes = () => import('./dashboard-overview/presentation/dashboard.routes').then((m) => m.dashboardRoutes);
const monitoringRoutes = () => import('./water-monitoring/presentation/monitoring.routes').then((m) => m.monitoringRoutes);
const alertsRoutes = () => import('./alerts-notifications/presentation/alerts.routes').then((m) => m.alertsRoutes);
const notificationRoutes = () => import('./notification/presentation/alerts.routes').then((m) => m.alertsRoutes);
const reportsRoutes = () => import('./reports-transparency/presentation/reports.routes').then((m) => m.reportsRoutes);
const billingRoutes = () => import('./billing/presentation/billing.routes').then((m) => m.billingRoutes);

const refillRoutes = () => import('./refill-management/presentation/refill-management.routes').then((m) => m.refillManagementRoutes);

const baseTitle = 'TankIQ';

export const routes: Routes = [
  { path: '', redirectTo: 'iam', pathMatch: 'full' },
  { path: 'iam', loadChildren: iamRoutes },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', loadChildren: dashboardRoutes },
      { path: 'monitoring', loadChildren: monitoringRoutes },
      { path: 'alerts', loadChildren: alertsRoutes },
      { path: 'reports', loadChildren: reportsRoutes },
      { path: 'refill-management', loadChildren: refillRoutes, title: `${baseTitle} - Refill` },
      { path: 'billing', loadChildren: billingRoutes, title: `${baseTitle} - Billing` },
      //TODO: Routes to do later
      { path: 'settings', loadComponent: placeholder, title: `${baseTitle} - Settings` },
      { path: 'profile', loadComponent: placeholder, title: `${baseTitle} - Profile` },
      { path: 'history', loadComponent: placeholder, title: `${baseTitle} - History` },
    ],
  },
  { path: 'monitoring', redirectTo: 'dashboard/monitoring', pathMatch: 'full' },
  { path: 'alerts', redirectTo: 'dashboard/alerts', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];


