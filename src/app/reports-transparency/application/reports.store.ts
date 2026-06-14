import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { computed, Injectable, signal } from '@angular/core';
import { Report } from '../domain/model/report.entity';
import { ReportsApi } from '../infrastructure/reports-api';


const DEMO_REPORTS: Report[] = [
  {
    id: 1,
    generatedAt: '2026-04-30T18:00:00',
    periodMonth: 4,
    periodYear: 2026,
    refillCount: 3,
    totalLiters: 15000,
    totalCostSoles: 285,
    status: 'generated',
  },
  {
    id: 2,
    generatedAt: '2026-03-31T18:00:00',
    periodMonth: 3,
    periodYear: 2026,
    refillCount: 4,
    totalLiters: 20000,
    totalCostSoles: 390,
    status: 'shared',
  },
  {
    id: 3,
    generatedAt: '2026-02-28T18:00:00',
    periodMonth: 2,
    periodYear: 2026,
    refillCount: 2,
    totalLiters: 10000,
    totalCostSoles: 190,
    status: 'generated',
  },
];

export interface ReportPeriod {
  month: number;
  year: number;
}

@Injectable({ providedIn: 'root' })
export class ReportsStore {
  private readonly waterConsumptionsSignal = signal<WaterConsumption[]>([]);
  readonly waterConsumptions = this.waterConsumptionsSignal.asReadonly();
  private readonly reportsSignal = signal<Report[]>(DEMO_REPORTS);
  private readonly selectedMonthSignal = signal<number>(4);
  private readonly selectedYearSignal = signal<number>(2026);
  private readonly feedbackSignal = signal<string | null>(null);
  private readonly loadingSignal = signal<boolean>(false);

  readonly reports = this.reportsSignal.asReadonly();
  readonly selectedMonth = this.selectedMonthSignal.asReadonly();
  readonly selectedYear = this.selectedYearSignal.asReadonly();
  readonly feedback = this.feedbackSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  readonly availablePeriods = computed<ReportPeriod[]>(() => {
    const periods = new Map<string, ReportPeriod>();

    this.reportsSignal().forEach((report) => {
      periods.set(this.toPeriodKey(report.periodMonth, report.periodYear), {
        month: report.periodMonth,
        year: report.periodYear,
      });
    });

    [
      { month: 6, year: 2026 },
      { month: 5, year: 2026 },
      { month: 4, year: 2026 },
      { month: 3, year: 2026 },
      { month: 2, year: 2026 },
      { month: 1, year: 2026 },
    ].forEach((period) => periods.set(this.toPeriodKey(period.month, period.year), period));

    return Array.from(periods.values()).sort((a, b) =>
      b.year === a.year ? b.month - a.month : b.year - a.year,
    );
  });

  readonly filteredReports = computed(() =>
    this.sortedReports().filter(
      (report) =>
        report.periodMonth === this.selectedMonthSignal() &&
        report.periodYear === this.selectedYearSignal(),
    ),
  );

  readonly recentReports = computed(() => this.sortedReports().slice(0, 3));

  readonly selectedPeriodReport = computed(() =>
    this.sortedReports().find(
      (report) =>
        report.periodMonth === this.selectedMonthSignal() &&
        report.periodYear === this.selectedYearSignal(),
    ) ?? null,
  );

  constructor(private readonly reportsApi: ReportsApi) {}

  loadReports(): void {
    this.loadingSignal.set(true);
    this.reportsApi.getReports().subscribe({
      next: (reports) => {
        this.reportsSignal.set(reports.length > 0 ? this.sortReports(reports) : DEMO_REPORTS);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.reportsSignal.set(DEMO_REPORTS);
        this.feedbackSignal.set('reports.feedback.demoData');
        this.loadingSignal.set(false);
      },
    });

    // NUEVO: cargar consumos de agua
    this.reportsApi.getWaterConsumptions().subscribe({
      next: (consumptions) => this.waterConsumptionsSignal.set(consumptions),
      error: () => this.waterConsumptionsSignal.set([]),
    });
  }

  updateSelectedPeriod(month: number, year: number): void {
    this.selectedMonthSignal.set(month);
    this.selectedYearSignal.set(year);
    this.feedbackSignal.set(null);
  }

  generateSelectedPeriodReport(): Report | null {
    const existingReport = this.selectedPeriodReport();

    if (existingReport) {
      this.feedbackSignal.set('reports.feedback.alreadyGenerated');
      return existingReport;
    }

    if (!this.hasEnoughDataForSelectedPeriod()) {
      this.feedbackSignal.set('reports.feedback.notEnoughData');
      return null;
    }

    const generatedReport = this.createGeneratedReport();
    this.reportsSignal.update((reports) => this.sortReports([generatedReport, ...reports]));
    this.feedbackSignal.set('reports.feedback.generated');
    return generatedReport;
  }

  markAsShared(id: number): void {
    this.reportsSignal.update((reports) =>
      reports.map((report) =>
        report.id === id ? { ...report, status: 'shared' } : report,
      ),
    );
    this.feedbackSignal.set('reports.feedback.shared');
  }

  viewReport(report: Report | null): void {
    if (!report) {
      this.feedbackSignal.set('reports.feedback.notEnoughData');
      return;
    }

    this.feedbackSignal.set('reports.feedback.preview');
  }

  clearFeedback(): void {
    this.feedbackSignal.set(null);
  }

  private sortedReports(): Report[] {
    return this.sortReports(this.reportsSignal());
  }

  private sortReports(reports: Report[]): Report[] {
    return [...reports].sort((a, b) => {
      if (b.periodYear !== a.periodYear) {
        return b.periodYear - a.periodYear;
      }
      return b.periodMonth - a.periodMonth;
    });
  }

  private createGeneratedReport(): Report {
    const month = this.selectedMonthSignal();
    const year = this.selectedYearSignal();

    return {
      id: this.nextReportId(),
      generatedAt: new Date().toISOString(),
      periodMonth: month,
      periodYear: year,
      refillCount: 3,
      totalLiters: 18000,
      totalCostSoles: 360,
      status: 'generated',
      buildingId: 1,
      generatedByUserId: 1,
    };
  }

  private hasEnoughDataForSelectedPeriod(): boolean {
    return this.toPeriodKey(this.selectedMonthSignal(), this.selectedYearSignal()) === '2026-05';
  }

  private nextReportId(): number {
    return Math.max(0, ...this.reportsSignal().map((report) => report.id)) + 1;
  }

  private toPeriodKey(month: number, year: number): string {
    return `${year}-${month.toString().padStart(2, '0')}`;
  }
}
