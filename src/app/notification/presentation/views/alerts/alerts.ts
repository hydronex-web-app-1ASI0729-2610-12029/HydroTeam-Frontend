import { Component, inject, signal, computed } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertsStore } from '../../../application/alerts.store';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { AlertType } from '../../../domain/model/alert-type.enum';
import { AlertStatus } from '../../../domain/model/alert-status.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [TranslatePipe, MatProgressSpinner, DatePipe, MatIcon, FormsModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  readonly store = inject(AlertsStore);

  private readonly selectedType = signal<string>('');
  private readonly selectedStatus = signal<string>('');

  readonly showForm = signal<boolean>(false);

  readonly newType = signal<AlertType>(AlertType.critical);
  readonly newMessage = signal<string>('');
  readonly newCisternId = signal<string>('');

  readonly AlertType = AlertType;

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

  toggleForm(): void {
    this.showForm.update(v => !v);
  }

  onNewTypeChange(event: Event): void {
    this.newType.set((event.target as HTMLSelectElement).value as AlertType);
  }

  onNewMessageChange(event: Event): void {
    this.newMessage.set((event.target as HTMLInputElement).value);
  }

  onNewCisternIdChange(event: Event): void {
    this.newCisternId.set((event.target as HTMLInputElement).value);
  }

  submitCreate(): void {
    if (!this.newMessage() || !this.newCisternId()) return;
    this.store.createAlert(this.newType(), this.newMessage(), this.newCisternId());
    this.newMessage.set('');
    this.newCisternId.set('');
    this.showForm.set(false);
  }

  onResolve(id: number): void {
    this.store.resolveAlert(id);
  }

  onDelete(id: number): void {
    this.store.deleteAlert(id);
  }
}