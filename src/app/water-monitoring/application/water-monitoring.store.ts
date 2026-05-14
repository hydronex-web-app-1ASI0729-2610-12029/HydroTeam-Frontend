import { computed, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { WaterLevel } from '../domain/model/water-level.entity';
import { WaterMonitoringApi } from '../infrastructure/water-monitoring-api';


@Injectable({ providedIn: 'root' })
export class WaterMonitoringStore {
  private readonly waterLevelsSignal = signal<WaterLevel[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly waterLevels = this.waterLevelsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();


  readonly latestReading = computed(() => {
    const levels = this.waterLevelsSignal();
    return levels.length ? levels[levels.length - 1] : null;
  });

  readonly currentLevelPercent = computed(() => this.latestReading()?.levelPercent ?? 0);


  readonly isLow = computed(() => this.latestReading()?.isLow() ?? false);


  readonly isCritical = computed(() => this.latestReading()?.isCritical() ?? false);

  constructor(private readonly waterMonitoringApi: WaterMonitoringApi) {
    this.loadWaterLevels();
  }

  private loadWaterLevels(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.waterMonitoringApi
      .getWaterLevels()
      .pipe(takeUntilDestroyed(), retry(2))
      .subscribe({
        next: (levels) => {
          this.waterLevelsSignal.set(levels);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load water levels'));
          this.loadingSignal.set(false);
        },
      });
  }

  private formatError(err: any, fallback: string): string {
    if (err instanceof Error) {
      return err.message.includes('Resource not found') ? `${fallback}: Not found` : err.message;
    }
    return fallback;
  }
}
