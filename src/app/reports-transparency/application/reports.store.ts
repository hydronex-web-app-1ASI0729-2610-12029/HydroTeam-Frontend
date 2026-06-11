import { computed, Injectable, signal } from '@angular/core';
import { Report } from '../domain/model/report.entity';

const MOCK_REPORTS: Report[] = [
  {
    id: 'report-2026-04',
    generatedAt: '2026-04-30T18:00:00',
    periodMonth: 4,
    periodYear: 2026,
    refillCount: 3,
    totalLiters: 15000,
    totalCostSoles: 285,
    status: 'generated',
  },
  {
    id: 'report-2026-03',
    generatedAt: '2026-03-31T18:00:00',
    periodMonth: 3,
    periodYear: 2026,
    refillCount: 4,
    totalLiters: 20000,
    totalCostSoles: 390,
    status: 'shared',
  },
  {
    id: 'report-2026-02',
    generatedAt: '2026-02-28T18:00:00',
    periodMonth: 2,
    periodYear: 2026,
    refillCount: 2,
    totalLiters: 10000,
    totalCostSoles: 190,
    status: 'generated',
  },
];

@Injectable({ providedIn: 'root' })
export class ReportsStore {
  private readonly reportsSignal = signal<Report[]>(MOCK_REPORTS);
  private readonly selectedMonthSignal = signal<number>(4);
  private readonly selectedYearSignal = signal<number>(2026);

  readonly reports = this.reportsSignal.asReadonly();
  readonly selectedMonth = this.selectedMonthSignal.asReadonly();
  readonly selectedYear = this.selectedYearSignal.asReadonly();

  readonly recentReports = computed(() => this.reportsSignal().slice(0, 3));

  readonly selectedPeriodReport = computed(() =>
    this.reportsSignal().find(
      (report) =>
        report.periodMonth === this.selectedMonthSignal() &&
        report.periodYear === this.selectedYearSignal(),
    ) ?? null,
  );

  updateSelectedPeriod(month: number, year: number): void {
    this.selectedMonthSignal.set(month);
    this.selectedYearSignal.set(year);
  }
}
