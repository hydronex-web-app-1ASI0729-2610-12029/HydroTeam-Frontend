import { computed, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Report } from '../domain/model/report.entity';
import { ReportsApi } from '../infrastructure/reports-api';
import { AuthenticationStore } from '../../iam/application/authentication.store';
import { ReportRefillResource } from '../infrastructure/reports-response';

export interface ReportPeriod {
  month: number;
  year: number;
}

@Injectable({ providedIn: 'root' })
export class ReportsStore {
  private readonly buildingId = 1;
  private readonly currentDate = new Date();
  private readonly refillsSignal = signal<ReportRefillResource[]>([]);
  private readonly reportsSignal = signal<Report[]>([]);
  private readonly selectedMonthSignal = signal<number>(this.currentDate.getMonth() + 1);
  private readonly selectedYearSignal = signal<number>(this.currentDate.getFullYear());
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

  readonly selectedPeriodReport = computed(() =>
    this.sortedReports().find(
      (report) =>
        report.periodMonth === this.selectedMonthSignal() &&
        report.periodYear === this.selectedYearSignal(),
    ) ?? null,
  );

  readonly selectedPeriodRefillCount = computed(
    () => this.calculateRefillTotals(this.selectedMonthSignal(), this.selectedYearSignal()).count,
  );

  readonly canGenerateReport = computed(
    () =>
      !this.loadingSignal() &&
      !this.selectedPeriodReport() &&
      this.selectedPeriodRefillCount() > 0,
  );

  constructor(
    private readonly reportsApi: ReportsApi,
    private readonly authenticationStore: AuthenticationStore,
  ) {}

  loadReports(): void {
    this.loadingSignal.set(true);
    forkJoin({
      reports: this.reportsApi.getReports(this.buildingId),
      refills: this.reportsApi.getRefills(),
    }).subscribe({
      next: ({ reports, refills }) => {
        this.refillsSignal.set(refills);
        this.reportsSignal.set(this.sortReports(reports.map((report) => this.enrichReport(report))));
        this.loadingSignal.set(false);
      },
      error: () => {
        this.reportsSignal.set([]);
        this.feedbackSignal.set('reports.feedback.demoData');
        this.loadingSignal.set(false);
      },
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

    if (this.selectedPeriodRefillCount() === 0) {
      this.feedbackSignal.set('reports.feedback.notEnoughData');
      return null;
    }

    const draft = this.createGeneratedReport();
    this.loadingSignal.set(true);
    this.reportsApi.createReport({
      periodMonth: draft.periodMonth,
      periodYear: draft.periodYear,
      totalCostSoles: draft.totalCostSoles,
      totalWaterLiters: draft.totalLiters,
      generatedAt: draft.generatedAt,
      buildingId: draft.buildingId ?? this.buildingId,
      generatedByUserId: draft.generatedByUserId ?? 1,
    }).subscribe({
      next: (generatedReport) => {
        this.reportsSignal.update((reports) =>
          this.sortReports([this.enrichReport(generatedReport), ...reports]),
        );
        this.feedbackSignal.set('reports.feedback.generated');
        this.loadingSignal.set(false);
      },
      error: () => {
        this.feedbackSignal.set('reports.feedback.generateError');
        this.loadingSignal.set(false);
      },
    });
    return null;
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
    const totals = this.calculateRefillTotals(month, year);
    const currentUserId = this.authenticationStore.currentUser()?.userId ?? 1;

    return {
      id: 0,
      generatedAt: new Date().toISOString(),
      periodMonth: month,
      periodYear: year,
      refillCount: totals.count,
      totalLiters: totals.liters,
      totalCostSoles: totals.costSoles,
      status: 'generated',
      buildingId: this.buildingId,
      generatedByUserId: currentUserId,
    };
  }

  private enrichReport(report: Report): Report {
    const totals = this.calculateRefillTotals(report.periodMonth, report.periodYear);
    return {
      ...report,
      refillCount: totals.count,
      totalLiters: totals.liters,
      totalCostSoles: totals.costSoles,
    };
  }

  private calculateRefillTotals(month: number, year: number) {
    const refills = this.refillsSignal().filter((refill) => {
      const dateValue = refill.refillDate ?? refill.refill_date;
      const buildingId = refill.buildingId ?? refill.building_id;
      if (!dateValue || buildingId !== this.buildingId) return false;
      const date = new Date(dateValue);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });

    return {
      count: refills.length,
      liters: refills.reduce((total, refill) => total + Number(refill.liters || 0), 0),
      costSoles: refills.reduce(
        (total, refill) => total + Number(refill.costSoles ?? refill.cost_soles ?? 0),
        0,
      ),
    };
  }

  private toPeriodKey(month: number, year: number): string {
    return `${year}-${month.toString().padStart(2, '0')}`;
  }
}
