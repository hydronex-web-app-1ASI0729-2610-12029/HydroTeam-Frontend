import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAlert } from '../../../domain/model/dashboard-alert.entity';
import { AlertItem } from '../alert-item/alert-item';

@Component({
  selector: 'app-active-alerts',
  standalone: true,
  imports: [AlertItem, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './active-alerts.html',
  styleUrl: './active-alerts.css',
})
export class ActiveAlerts {
  alerts = input.required<DashboardAlert[]>();
}
