import { Routes } from '@angular/router';

export const refillManagementRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/refill-list/refill-list').then((m) => m.RefillList)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./views/refill-form/refill-form').then((m) => m.RefillForm)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./views/refill-form/refill-form').then((m) => m.RefillForm)
  },
  {
    path: 'cost-summary',
    loadComponent: () =>
      import('./views/refill-cost-summary/refill-cost-summary').then((m) => m.RefillCostSummary)
  }
];
