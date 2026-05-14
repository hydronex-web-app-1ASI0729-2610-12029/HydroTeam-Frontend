import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardResponse } from './dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  getDashboardOverview(): Observable<DashboardResponse> {
    return of({
      metrics: [
        {
          id: 'current-level',
          label: 'Current level',
          value: '72%',
          detail: '3,600 L available',
          progress: 72,
          icon: 'water_drop',
          trend: 'stable'
        },
        {
          id: 'estimated-days',
          label: 'Estimated days',
          value: '8 days',
          detail: 'Based on current consumption',
          progress: 64,
          icon: 'calendar_month',
          trend: 'stable'
        },
        {
          id: 'average-consumption',
          label: 'Average consumption',
          value: '450 L/day',
          detail: '12% lower than last week',
          progress: 58,
          icon: 'monitoring',
          trend: 'down'
        },
        {
          id: 'last-refill',
          label: 'Last refill',
          value: '2 days ago',
          detail: 'Registered by building admin',
          progress: 35,
          icon: 'local_shipping',
          trend: 'stable'
        }
      ],
      cistern: {
        levelPercentage: 72,
        availableLiters: 3600,
        capacityLiters: 5000,
        statusLabel: 'Optimal status',
        statusType: 'optimal',
        signalStrength: 'Strong signal',
        sensorTemperature: '24°C',
        lastUpdate: 'Updated 5 min ago'
      },
      consumption: [
        { period: '7 days', averageLiters: 450, peakLiters: 620, savedLiters: 180 },
        { period: '30 days', averageLiters: 470, peakLiters: 690, savedLiters: 760 },
        { period: '90 days', averageLiters: 485, peakLiters: 720, savedLiters: 2050 }
      ],
      alerts: [
        {
          id: 'a1',
          title: 'Stable water level',
          message: 'The cistern level is within the expected range.',
          severity: 'info',
          time: '5 min ago',
          icon: 'check_circle'
        },
        {
          id: 'a2',
          title: 'Consumption variation',
          message: 'Consumption increased during the last evening period.',
          severity: 'warning',
          time: '2 hours ago',
          icon: 'warning'
        },
        {
          id: 'a3',
          title: 'Sensor online',
          message: 'The main sensor is reporting data correctly.',
          severity: 'info',
          time: 'Today',
          icon: 'sensors'
        }
      ]
    });
  }
}
