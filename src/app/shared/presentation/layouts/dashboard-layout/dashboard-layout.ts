import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  protected readonly navigationOptions = signal([
    { link: '/dashboard', icon: '▦', label: 'dashboardLayout.nav.home', exact: true },
    { link: '/dashboard/monitoring', icon: '◉', label: 'dashboardLayout.nav.monitoring', exact: false },
    { link: '/dashboard/alerts', icon: '●', label: 'dashboardLayout.nav.alerts', exact: false },
    { link: '/dashboard/history', icon: '↻', label: 'dashboardLayout.nav.history', exact: false },
    { link: '/dashboard/reports', icon: '▣', label: 'dashboardLayout.nav.reports', exact: false },
    { link: '/dashboard/settings', icon: '⚙', label: 'dashboardLayout.nav.settings', exact: false },
    { link: '/dashboard/profile', icon: '◔', label: 'dashboardLayout.nav.profile', exact: false },
  ]);
}
