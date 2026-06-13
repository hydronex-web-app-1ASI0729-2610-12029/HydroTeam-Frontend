import { Component, inject, signal, computed } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertsStore } from '../../../application/alerts.store';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { AlertType } from '../../../domain/model/alert-type.enum';
import { AlertStatus } from '../../../domain/model/alert-status.enum';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [TranslatePipe, MatProgressSpinner, DatePipe, MatIcon],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  readonly store = inject(AlertsStore);

  private readonly selectedType = signal<string>('');
  private readonly selectedStatus = signal<string>('');

  readonly filteredAlerts = computed(() => {
    return this.store.alerts().filter(alert => {
      const matchesType = this.selectedType() === '' || alert.type === this.selectedType();
      const matchesStatus = this.selectedStatus() === '' || alert.status === this.selectedStatus();
      return matchesType && matchesStatus;
    });
  });

  onTypeFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedType.set(value);
  }

  onStatusFilter(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
  }
}