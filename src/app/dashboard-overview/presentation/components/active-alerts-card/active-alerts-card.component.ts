import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardAlert } from '../../../domain/model/dashboard-alert.entity';
import { AlertItemComponent } from '../alert-item/alert-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-alerts-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, AlertItemComponent],
  templateUrl: './active-alerts-card.component.html',
  styleUrls: ['./active-alerts-card.component.scss']
})
export class ActiveAlertsCardComponent {
  @Input({ required: true }) alerts: DashboardAlert[] = [];
  constructor(private readonly router: Router) {}

goToAlerts(): void {
  this.router.navigate(['/dashboard/alerts']);
}

}
