import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DashboardStore } from '../../../application/dashboard.store';
import { ActiveAlertsCardComponent } from '../../components/active-alerts-card/active-alerts-card.component';
import { CisternStatusCardComponent } from '../../components/cistern-status-card/cistern-status-card.component';
import { ConsumptionSummaryComponent } from '../../components/consumption-summary/consumption-summary.component';
import { MetricCardComponent } from '../../components/metric-card/metric-card.component';

@Component({
  selector: 'app-dashboard-overview-page',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MetricCardComponent,
    CisternStatusCardComponent,
    ConsumptionSummaryComponent,
    ActiveAlertsCardComponent
  ],
  providers: [DashboardStore],
  templateUrl: './dashboard-overview-page.component.html',
  styleUrls: ['./dashboard-overview-page.component.css']
})
export class DashboardOverviewPageComponent implements OnInit {
  constructor(readonly store: DashboardStore) {}

  ngOnInit(): void {
    this.store.load();
  }
}
