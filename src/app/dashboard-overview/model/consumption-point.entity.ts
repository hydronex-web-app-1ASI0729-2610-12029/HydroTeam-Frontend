export interface ConsumptionPoint {
  label: string;
  liters: number;
}

export interface ConsumptionSeries {
  period: '7d' | '1m' | '3m';
  points: ConsumptionPoint[];
  average: number;
  peak: number;
  total: number;
}
