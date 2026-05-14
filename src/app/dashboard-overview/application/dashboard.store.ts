import { Injectable, signal } from '@angular/core';
import { DashboardMetric } from '../domain/model/dashboard-metric.entity';
import { CisternStatus } from '../domain/model/cistern-status.entity';
import { ConsumptionSummary } from '../domain/model/consumption-summary.entity';
import { DashboardAlert } from '../domain/model/dashboard-alert.entity';
import { DashboardApiService } from '../infrastructure/dashboard-api.service';
import { DashboardAssembler } from '../infrastructure/dashboard-assembler';

@Injectable()
export class DashboardStore {
  readonly metrics = signal<DashboardMetric[]>([]);
  readonly cistern = signal<CisternStatus | null>(null);
  readonly consumption = signal<ConsumptionSummary[]>([]);
  readonly alerts = signal<DashboardAlert[]>([]);
  readonly loading = signal<boolean>(true);

  constructor(private readonly dashboardApi: DashboardApiService) {}

  load(): void {
    this.loading.set(true);

    this.dashboardApi.getDashboardOverview().subscribe((response) => {
      this.metrics.set(DashboardAssembler.toMetrics(response));
      this.cistern.set(DashboardAssembler.toCisternStatus(response));
      this.consumption.set(DashboardAssembler.toConsumptionSummary(response));
      this.alerts.set(DashboardAssembler.toAlerts(response));
      this.loading.set(false);
    });
  }
}
