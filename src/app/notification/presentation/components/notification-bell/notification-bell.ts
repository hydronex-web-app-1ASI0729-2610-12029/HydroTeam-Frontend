import { Component, inject, signal, computed } from '@angular/core';
import { AlertsStore } from '../../../application/alerts.store';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertStatus } from '../../../domain/model/alert-status.enum';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [MatIcon, DatePipe, TranslatePipe],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.css',
})
export class NotificationBell {
  readonly store = inject(AlertsStore);

  readonly isPanelOpen = signal<boolean>(false);

  private readonly readIds = signal<Set<number>>(new Set());

  readonly unreadCount = computed(() =>
    this.store.alerts().filter(a =>
      a.status !== AlertStatus.resolved && !this.readIds().has(a.id)
    ).length
  );

  readonly activeAlerts = computed(() =>
    this.store.alerts().filter(a => a.status !== AlertStatus.resolved)
  );

  togglePanel(): void {
    this.isPanelOpen.update(v => !v);
  }

  markAsRead(id: number): void {
    this.readIds.update(set => {
      const next = new Set(set);
      next.add(id);
      return next;
    });
  }

  closePanel(): void {
    this.isPanelOpen.set(false);
  }
}