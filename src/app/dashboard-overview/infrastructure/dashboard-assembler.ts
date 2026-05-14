import { DashboardResponse } from './dashboard-response';
import { DashboardMetric } from '../domain/model/dashboard-metric.entity';
import { CisternStatus } from '../domain/model/cistern-status.entity';
import { ConsumptionSummary } from '../domain/model/consumption-summary.entity';
import { DashboardAlert } from '../domain/model/dashboard-alert.entity';

export class DashboardAssembler {
  static toMetrics(response: DashboardResponse): DashboardMetric[] {
    return response.metrics;
  }

  static toCisternStatus(response: DashboardResponse): CisternStatus {
    return response.cistern;
  }

  static toConsumptionSummary(response: DashboardResponse): ConsumptionSummary[] {
    return response.consumption;
  }

  static toAlerts(response: DashboardResponse): DashboardAlert[] {
    return response.alerts;
  }
}
