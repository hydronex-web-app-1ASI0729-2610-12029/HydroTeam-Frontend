export type DashboardMetricTone = 'success' | 'primary' | 'warning';

export interface DashboardMetric {
  title: string;
  value: string;
  detail: string;
  icon: string;
  tone: DashboardMetricTone;
  progress?: number;
}
