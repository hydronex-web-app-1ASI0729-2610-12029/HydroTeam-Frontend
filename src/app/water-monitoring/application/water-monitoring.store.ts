import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, retry } from 'rxjs';
import { WaterLevel } from '../domain/model/water-level.entity';
import { Cistern } from '../domain/model/cistern.entity';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { WaterMonitoringApi } from '../infrastructure/water-monitoring-api';

@Injectable({ providedIn: 'root' })
export class WaterMonitoringStore {
  private readonly waterLevelsSignal = signal<WaterLevel[]>([]);
  private readonly cisternsSignal = signal<Cistern[]>([]);
  private readonly consumptionsSignal = signal<WaterConsumption[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly waterLevels = this.waterLevelsSignal.asReadonly();
  readonly cisterns = this.cisternsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly latestReading = computed(() => {
    const levels = this.waterLevelsSignal();
    return levels.length ? levels[levels.length - 1] : null;
  });

  readonly currentLevelPercent = computed(() => {
    const cisterns = this.cisternsSignal();
    if (!cisterns.length) return this.latestReading()?.levelPercent ?? 0;
    const totalCap = cisterns.reduce((sum, c) => sum + c.capacityLiters, 0);
    const totalVol = cisterns.reduce((sum, c) => sum + c.currentVolumeLiters, 0);
    return totalCap ? Math.round((totalVol / totalCap) * 1000) / 10 : 0;
  });

  readonly totalCurrentLiters = computed(() =>
    this.cisternsSignal().reduce((sum, c) => sum + c.currentVolumeLiters, 0)
  );

  readonly totalAvgDailyLiters = computed(() =>
    this.consumptionsSignal().reduce((sum, c) => sum + c.avgDailyLiters, 0)
  );

  readonly projectedDays = computed(() => {
    const daily = this.totalAvgDailyLiters();
    if (!daily) return null;
    return Math.floor(this.totalCurrentLiters() / daily);
  });

  readonly isLowOnDays = computed(() => {
    const days = this.projectedDays();
    return days !== null && days < 7;
  });

  readonly isLow = computed(() => {
    const cisterns = this.cisternsSignal();
    if (!cisterns.length) return this.latestReading()?.isLow() ?? false;
    return cisterns.some((c) => c.isLow());
  });

  readonly isCritical = computed(() => this.currentLevelPercent() < 10);

  constructor(private readonly waterMonitoringApi: WaterMonitoringApi) {
    this.loadAll();
  }

  private loadAll(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    forkJoin({
      readings: this.waterMonitoringApi.getWaterLevels(),
      cisterns: this.waterMonitoringApi.getCisterns(),
      consumptions: this.waterMonitoringApi.getWaterConsumptions(),
    })
      .pipe(takeUntilDestroyed(), retry(2))
      .subscribe({
        next: ({ readings, cisterns, consumptions }) => {
          this.waterLevelsSignal.set(readings);
          this.cisternsSignal.set(cisterns);
          this.consumptionsSignal.set(consumptions);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load monitoring data'));
          this.loadingSignal.set(false);
        },
      });
  }

  private formatError(err: unknown, fallback: string): string {
    if (err instanceof Error) {
      return err.message.includes('Resource not found') ? `${fallback}: Not found` : err.message;
    }
    return fallback;
  }
}
