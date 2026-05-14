import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashboardMetric } from '../../../domain/model/dashboard-metric.entity';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule],
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss']
})
export class MetricCardComponent {
  @Input({ required: true }) metric!: DashboardMetric;
}
