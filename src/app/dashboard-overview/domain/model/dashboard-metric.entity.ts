export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  progress: number;
  icon: string;
  trend: 'up' | 'down' | 'stable';
}
