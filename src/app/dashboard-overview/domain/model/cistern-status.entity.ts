export interface CisternStatus {
  levelPercentage: number;
  availableLiters: number;
  capacityLiters: number;
  statusLabel: string;
  statusType: 'optimal' | 'warning' | 'critical';
  signalStrength: string;
  sensorTemperature: string;
  lastUpdate: string;
}
