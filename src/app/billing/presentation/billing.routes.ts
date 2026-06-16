import {Routes} from '@angular/router';

const billing = () =>
  import('./views/billing-view/billing-view').then((m) => m.BillingView);

export const billingRoutes: Routes = [
  {path: '', loadComponent: billing, title: 'TankIQ - Billing'},
]
