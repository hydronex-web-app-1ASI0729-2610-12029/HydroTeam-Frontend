import { computed, inject, Injectable, signal, DestroyRef } from '@angular/core';
import { Alert } from '../domain/model/alert.entity';
import { AlertType } from '../domain/model/alert-type.enum';
import { AlertStatus } from '../domain/model/alert-status.enum';
import { AlertsApi } from '../infrastructure/alerts-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertsStore {
  private readonly alertsApi = inject(AlertsApi);
  private readonly destroyRef = inject(DestroyRef);

  private readonly alertsSignal = signal<Alert[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly alerts = this.alertsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly alertCount = computed(() => this.alertsSignal().length);
  readonly pendingAlerts = computed(() =>
    this.alertsSignal().filter(a => a.status === AlertStatus.pending));
  readonly criticalAlerts = computed(() =>
    this.alertsSignal().filter(a => a.type === AlertType.critical && a.status !== AlertStatus.resolved));
  readonly hasCriticalAlert = computed(() => this.criticalAlerts().length > 0);

  constructor() {
    this.loadAlerts();
  }

private loadAlerts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.alertsApi.getAlerts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (alerts) => {
        this.alertsSignal.set(alerts as Alert[]);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: (error: unknown) => {
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
      status: AlertStatus.resolved,
      triggeredAt: alert.triggeredAt,
      resolvedAt: new Date().toISOString(),
      cisternId: alert.cisternId
    });
    this.loadingSignal.set(true);
    this.alertsApi.updateAlert(resolved).pipe(retry(2)).subscribe({
      next: () => {
        this.alertsSignal.update(alerts => alerts.map(a => a.id === id ? resolved : a));
        this.loadingSignal.set(false);
      },
      error: (error: unknown) => {
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
      error: (error: unknown) => {
        this.errorSignal.set(this.formatError(error, 'Failed to delete alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  private formatError(err: unknown, fallback: string): string {
    if (err instanceof Error) {
      return err.message.includes('Resource not found') ? `${fallback}: Not found` : err.message;
    }
    return fallback;
  }
}