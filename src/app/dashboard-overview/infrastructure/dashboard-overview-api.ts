import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { DashboardOverview } from '../domain/model/dashboard-overview.entity';
import { DashboardOverviewAssembler } from './dashboard-overview-assembler';
import { DashboardOverviewResponse } from './dashboard-overview-response';

@Injectable({ providedIn: 'root' })
export class DashboardOverviewApi {
  getOverview(): Observable<DashboardOverview> {
    const response: DashboardOverviewResponse = {
      buildingName: 'Edificio Los Pinos',
      district: 'SJL',
      lastUpdated: 'Updated 3 min ago',
      levelPercentage: 72,
      availableLiters: 3600,
      estimatedDays: 8,
      averageConsumption: 450,
      lastRefillDate: '12 April',
      lastRefillAmount: 5000,
      lastRefillCost: 95,
      sensorTemperature: 22,
      signal: 'Excellent',
      consumption7d: [420, 570, 480, 360, 620, 450, 520],
      consumption1m: [410, 640, 470, 360, 720, 445, 540, 575, 340, 690, 510, 430, 655, 530],
      consumption3m: [12200, 13500, 12800, 14200, 13100, 13900, 14500, 13600, 13200, 15000, 14100, 13800],
      alerts: [
        {
          title: 'Unusual consumption detected',
          description: 'On Monday consumption was 18% higher than average · check for leaks',
          time: '2h ago',
          type: 'warning',
        },
        {
          title: 'Refill registered successfully',
          description: '5,000 L · S/. 95',
          time: 'Yesterday',
          type: 'success',
        },
      ],
    };

    return of(response).pipe(
      delay(150),
      map((payload) => DashboardOverviewAssembler.toEntity(payload)),
    );
  }
}
