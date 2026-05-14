export type DashboardAlertTone = 'warning' | 'success' | 'info';

export interface DashboardAlert {
  title: string;
  description: string;
  time: string;
  icon: string;
  tone: DashboardAlertTone;
}
