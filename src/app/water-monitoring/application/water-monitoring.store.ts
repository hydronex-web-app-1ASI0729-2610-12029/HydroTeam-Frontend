import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, retry } from 'rxjs';
import { Building } from '../domain/model/building.entity';
import { Cistern } from '../domain/model/cistern.entity';
import { Sensor } from '../domain/model/sensor.entity';
import { WaterLevel } from '../domain/model/water-level.entity';
import { WaterMonitoringApi } from '../infrastructure/water-monitoring-api';

@Injectable({ providedIn: 'root' })
export class WaterMonitoringStore {
  private readonly buildingsSignal = signal<Building[]>([]);
  private readonly cisternsSignal = signal<Cistern[]>([]);
  private readonly sensorsSignal = signal<Sensor[]>([]);
  private readonly waterLevelsSignal = signal<WaterLevel[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly buildings = this.buildingsSignal.asReadonly();
  readonly cisterns = this.cisternsSignal.asReadonly();
  readonly sensors = this.sensorsSignal.asReadonly();
  readonly waterLevels = this.waterLevelsSignal.asReadonly();
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
    this.cisternsSignal().reduce((sum, c) => sum + c.currentVolumeLiters, 0),
  );

  readonly projectedDays = computed<number | null>(() => null);
  readonly isLowOnDays = computed(() => false);

  readonly isLow = computed(() => {
    const cisterns = this.cisternsSignal();
    if (!cisterns.length) return this.latestReading()?.isLow() ?? false;
    return cisterns.some((c) => c.isLow());
  });

  readonly isCritical = computed(() => this.currentLevelPercent() < 10);

  constructor(private readonly api: WaterMonitoringApi) {
    this.loadAll();
  }

  private loadAll(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    forkJoin({
      buildings: this.api.getBuildings(),
      cisterns: this.api.getCisterns(),
      sensors: this.api.getSensors(),
      readings: this.api.getWaterLevels(),
    })
      .pipe(takeUntilDestroyed(), retry(2))
      .subscribe({
        next: ({ buildings, cisterns, sensors, readings }) => {
          this.buildingsSignal.set(buildings);
          this.cisternsSignal.set(cisterns);
          this.sensorsSignal.set(sensors);
          this.waterLevelsSignal.set(readings);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load monitoring data'));
          this.loadingSignal.set(false);
        },
      });
  }

  // Building CRUD
  createBuilding(building: Building): void {
    this.api.createBuilding(building).pipe(retry(2)).subscribe({
      next: (created) => this.buildingsSignal.update((bs) => [...bs, created]),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to create building')),
    });
  }

  updateBuilding(building: Building): void {
    this.api.updateBuilding(building).pipe(retry(2)).subscribe({
      next: (updated) =>
        this.buildingsSignal.update((bs) => bs.map((b) => (b.id === updated.id ? updated : b))),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to update building')),
    });
  }

  deleteBuilding(id: number): void {
    this.api.deleteBuilding(id).pipe(retry(2)).subscribe({
      next: () => this.buildingsSignal.update((bs) => bs.filter((b) => b.id !== id)),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to delete building')),
    });
  }

  // Cistern CRUD
  createCistern(cistern: Cistern): void {
    this.api.createCistern(cistern).pipe(retry(2)).subscribe({
      next: (created) => this.cisternsSignal.update((cs) => [...cs, created]),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to create cistern')),
    });
  }

  updateCistern(cistern: Cistern): void {
    this.api.updateCistern(cistern).pipe(retry(2)).subscribe({
      next: (updated) =>
        this.cisternsSignal.update((cs) => cs.map((c) => (c.id === updated.id ? updated : c))),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to update cistern')),
    });
  }

  deleteCistern(id: number): void {
    this.api.deleteCistern(id).pipe(retry(2)).subscribe({
      next: () => this.cisternsSignal.update((cs) => cs.filter((c) => c.id !== id)),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to delete cistern')),
    });
  }

  // Sensor CRUD
  createSensor(sensor: Sensor): void {
    this.api.createSensor(sensor).pipe(retry(2)).subscribe({
      next: (created) => this.sensorsSignal.update((ss) => [...ss, created]),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to create sensor')),
    });
  }

  updateSensor(sensor: Sensor): void {
    this.api.updateSensor(sensor).pipe(retry(2)).subscribe({
      next: (updated) =>
        this.sensorsSignal.update((ss) => ss.map((s) => (s.id === updated.id ? updated : s))),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to update sensor')),
    });
  }

  deleteSensor(id: number): void {
    this.api.deleteSensor(id).pipe(retry(2)).subscribe({
      next: () => this.sensorsSignal.update((ss) => ss.filter((s) => s.id !== id)),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to delete sensor')),
    });
  }

  // Water level reading CRUD
  createWaterLevel(reading: WaterLevel): void {
    this.api.createWaterLevel(reading).pipe(retry(2)).subscribe({
      next: (created) => this.waterLevelsSignal.update((rs) => [...rs, created]),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to create reading')),
    });
  }

  deleteWaterLevel(id: number): void {
    this.api.deleteWaterLevel(id).pipe(retry(2)).subscribe({
      next: () => this.waterLevelsSignal.update((rs) => rs.filter((r) => r.id !== id)),
      error: (err) => this.errorSignal.set(this.formatError(err, 'Failed to delete reading')),
    });
  }

  private formatError(err: unknown, fallback: string): string {
    if (err instanceof Error) {
      return err.message.includes('Resource not found') ? `${fallback}: Not found` : err.message;
    }
    return fallback;
  }
}
