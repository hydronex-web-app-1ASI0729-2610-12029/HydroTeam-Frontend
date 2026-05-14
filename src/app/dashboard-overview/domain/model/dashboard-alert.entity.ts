export interface DashboardAlert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  time: string;
  icon: string;
}
