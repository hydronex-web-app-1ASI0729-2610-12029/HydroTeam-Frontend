import { DashboardMetric } from './dashboard-metric.entity';
import { CisternStatus } from './cistern-status.entity';
import { ConsumptionSeries } from './consumption-point.entity';
import { DashboardAlert } from './dashboard-alert.entity';
import { DashboardInsight } from './dashboard-insight.entity';

export interface DashboardOverview {
  buildingName: string;
  district: string;
  lastUpdated: string;
  metrics: DashboardMetric[];
  cisternStatus: CisternStatus;
  consumption: ConsumptionSeries[];
  alerts: DashboardAlert[];
  insights: DashboardInsight[];
}
