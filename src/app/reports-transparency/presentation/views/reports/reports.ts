import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ReportPeriod, ReportsStore } from '../../../application/reports.store';
import { Report } from '../../../domain/model/report.entity';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DatePipe, DecimalPipe, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  protected readonly store = inject(ReportsStore);
  private readonly translate = inject(TranslateService);

  protected readonly periodOptions = computed(() =>
    this.store.availablePeriods().map((period) => ({
      value: this.toPeriodValue(period),
      label: this.formatPeriod(period),
    })),
  );

  protected readonly selectedPeriodValue = computed(() =>
    `${this.store.selectedYear()}-${this.store.selectedMonth().toString().padStart(2, '0')}`,
  );

  ngOnInit(): void {
    this.store.loadReports();
  }

  protected formatPeriod(report: Pick<Report, 'periodMonth' | 'periodYear'> | ReportPeriod): string {
    const periodMonth = 'periodMonth' in report ? report.periodMonth : report.month;
    const periodYear = 'periodYear' in report ? report.periodYear : report.year;
    const month = this.translate.instant(`reports.months.${periodMonth}`);
    return `${month} ${periodYear}`;
  }

  protected toPeriodValue(report: Pick<Report, 'periodMonth' | 'periodYear'> | ReportPeriod): string {
    const periodMonth = 'periodMonth' in report ? report.periodMonth : report.month;
    const periodYear = 'periodYear' in report ? report.periodYear : report.year;
    return `${periodYear}-${periodMonth.toString().padStart(2, '0')}`;
  }

  protected updatePeriod(value: string): void {
    const [year, month] = value.split('-').map(Number);
    this.store.updateSelectedPeriod(month, year);
  }

  protected generateReport(): void {
    this.store.generateSelectedPeriodReport();
  }

  protected viewReport(report: Report | null): void {
    this.store.viewReport(report);
  }

  protected downloadReport(report: Report | null): void {
    if (!report) {
      this.store.generateSelectedPeriodReport();
      return;
    }

    const rows = [
      ['Periodo', this.formatPeriod(report)],
      ['Recargas', report.refillCount.toString()],
      ['Litros totales', report.totalLiters.toString()],
      ['Gasto soles', report.totalCostSoles.toString()],
      ['Generado', report.generatedAt],
      ['Estado', report.status],
    ];

    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `tankiq-report-${this.toPeriodValue(report)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  protected shareReport(report: Report | null): void {
    if (!report) {
      this.store.generateSelectedPeriodReport();
      return;
    }

    this.store.markAsShared(report.id);
  }
}
