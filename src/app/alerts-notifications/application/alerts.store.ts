import { computed, Injectable, signal } from '@angular/core';
import { Alert } from '../domain/model/alert.entity';
import { AlertsApi } from '../infrastructure/alerts-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertsStore {
  private readonly alertsSignal = signal<Alert[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly alerts = this.alertsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly alertCount = computed(() => this.alertsSignal().length);
  readonly unresolvedAlerts = computed(() => this.alertsSignal().filter(a => !a.isResolved));
  readonly criticalAlerts = computed(() => this.alertsSignal().filter(a => a.type === 'CRITICAL' && !a.isResolved));
  readonly hasCriticalAlert = computed(() => this.criticalAlerts().length > 0);

  constructor(private alertsApi: AlertsApi) {
    this.loadAlerts();
  }

  private loadAlerts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.alertsApi.getAlerts().pipe(takeUntilDestroyed()).subscribe({
      next: alerts => {
        this.alertsSignal.set(alerts);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: error => {
        this.errorSignal.set(this.formatError(error, 'Failed to load alerts'));
        this.loadingSignal.set(false);
      }
    });
  }

  resolveAlert(id: number): void {
    const alert = this.alertsSignal().find(a => a.id === id);
    if (!alert) return;
    const resolved = new Alert({
      id: alert.id,
      type: alert.type,
      message: alert.message,
      timestamp: alert.timestamp,
      isResolved: true,
      cisternId: alert.cisternId
    });
    this.loadingSignal.set(true);
    this.alertsApi.updateAlert(resolved).pipe(retry(2)).subscribe({
      next: () => {
        this.alertsSignal.update(alerts => alerts.map(a => a.id === id ? resolved : a));
        this.loadingSignal.set(false);
      },
      error: error => {
        this.errorSignal.set(this.formatError(error, 'Failed to resolve alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteAlert(id: number): void {
    this.loadingSignal.set(true);
    this.alertsApi.deleteAlert(id).pipe(retry(2)).subscribe({
      next: () => {
        this.alertsSignal.update(alerts => alerts.filter(a => a.id !== id));
        this.loadingSignal.set(false);
      },
      error: error => {
        this.errorSignal.set(this.formatError(error, 'Failed to delete alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  private formatError(err: any, fallback: string): string {
    if (err instanceof Error) {
      return err.message.includes('Resource not found') ? `${fallback}: Not found` : err.message;
    }
    return fallback;
  }
}
