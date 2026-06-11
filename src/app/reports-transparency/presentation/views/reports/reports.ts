import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReportsStore } from '../../../application/reports.store';
import { Report } from '../../../domain/model/report.entity';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DatePipe, DecimalPipe, MatButtonModule, MatIconModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  protected readonly store = inject(ReportsStore);

  protected readonly monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  protected readonly periodOptions = computed(() =>
    this.store.reports().map((report) => ({
      value: this.toPeriodValue(report),
      label: this.formatPeriod(report),
    })),
  );

  protected readonly selectedPeriodValue = computed(() =>
    `${this.store.selectedYear()}-${this.store.selectedMonth().toString().padStart(2, '0')}`,
  );

  protected formatPeriod(report: Pick<Report, 'periodMonth' | 'periodYear'>): string {
    return `${this.monthNames[report.periodMonth - 1]} ${report.periodYear}`;
  }

  protected toPeriodValue(report: Pick<Report, 'periodMonth' | 'periodYear'>): string {
    return `${report.periodYear}-${report.periodMonth.toString().padStart(2, '0')}`;
  }

  protected updatePeriod(value: string): void {
    const [year, month] = value.split('-').map(Number);
    this.store.updateSelectedPeriod(month, year);
  }
}
