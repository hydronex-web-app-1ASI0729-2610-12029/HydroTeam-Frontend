import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationStore } from '../../../../iam/application/authentication.store';
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  protected readonly navigationOptions = signal([
    //{ link: '/dashboard', icon: '▦', label: 'dashboardLayout.nav.home', exact: true },
    { link: '/dashboard/monitoring', icon: '📊', label: 'dashboardLayout.nav.monitoring', exact: false },
    { link: '/dashboard/notifications', icon: '⚠️', label: 'dashboardLayout.nav.alerts', exact: false },
    { link: '/dashboard/reports', icon: '📄', label: 'dashboardLayout.nav.reports', exact: false },
    //TODO: Translate later
    { link: '/dashboard/refill-management', icon: '🔄', label: 'dashboardLayout.nav.refill', exact: false },
    { link: '/dashboard/billing', icon: '⎔', label: 'Subscriptions', exact: false },
    //TODO: Routes to do later
    //{ link: '/dashboard/history', icon: '📝', label: 'dashboardLayout.nav.history', exact: false },
    //{ link: '/dashboard/settings', icon: '⚙', label: 'dashboardLayout.nav.settings', exact: false },
    //{ link: '/dashboard/profile', icon: '👤', label: 'dashboardLayout.nav.profile', exact: false }
  ]);

  constructor(protected readonly authStore: AuthenticationStore) {}

  protected get userName(): string {
    return this.authStore.currentUser()?.name ?? 'Usuario';
  }

  protected get userEmail(): string {
    return this.authStore.currentUser()?.email ?? '';
  }

  protected get userInitials(): string {
    const name = this.userName;
    return name.length >= 2 ? name.substring(0, 2).toUpperCase() : 'US';
  }

  logout(): void {
    this.authStore.signOut();
  }
}
