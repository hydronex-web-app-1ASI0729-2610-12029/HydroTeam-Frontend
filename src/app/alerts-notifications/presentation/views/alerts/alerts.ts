import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertsStore } from '../../../application/alerts.store';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [TranslatePipe, MatProgressSpinner, DatePipe, MatIcon],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  readonly store = inject(AlertsStore);
}
