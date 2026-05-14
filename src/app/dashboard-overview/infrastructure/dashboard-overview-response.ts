export interface DashboardOverviewResponse {
  buildingName: string;
  district: string;
  lastUpdated: string;
  levelPercentage: number;
  availableLiters: number;
  estimatedDays: number;
  averageConsumption: number;
  lastRefillDate: string;
  lastRefillAmount: number;
  lastRefillCost: number;
  sensorTemperature: number;
  signal: string;
  consumption7d: number[];
  consumption1m: number[];
  consumption3m: number[];
  alerts: Array<{
    title: string;
    description: string;
    time: string;
    type: 'warning' | 'success' | 'info';
  }>;
}
