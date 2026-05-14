import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { WaterMonitoringStore } from '../../../application/water-monitoring.store';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [DatePipe, MatProgressSpinnerModule, TranslatePipe],
  templateUrl: './monitoring.html',
  styleUrl: './monitoring.css',
})
export class Monitoring {
  protected readonly store = inject(WaterMonitoringStore);
}
