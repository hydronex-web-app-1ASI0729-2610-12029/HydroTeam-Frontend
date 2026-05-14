export interface DashboardResponse {
  metrics: Array<{
    id: string;
    label: string;
    value: string;
    detail: string;
    progress: number;
    icon: string;
    trend: 'up' | 'down' | 'stable';
  }>;
  cistern: {
    levelPercentage: number;
    availableLiters: number;
    capacityLiters: number;
    statusLabel: string;
    statusType: 'optimal' | 'warning' | 'critical';
    signalStrength: string;
    sensorTemperature: string;
    lastUpdate: string;
  };
  consumption: Array<{
    period: string;
    averageLiters: number;
    peakLiters: number;
    savedLiters: number;
  }>;
  alerts: Array<{
    id: string;
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'critical';
    time: string;
    icon: string;
  }>;
}
