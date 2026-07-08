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
  private readonly fallbackBuildingId = 1;
  private readonly fallbackGeneratedByUserId = 1;
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

    this.lastMonths(12).forEach((period) =>
      periods.set(this.toPeriodKey(period.month, period.year), period),
    );

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

  readonly recentReports = computed(() => this.filteredReports());

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
    const buildingId = this.currentBuildingId();
    forkJoin({
      reports: this.reportsApi.getReports(buildingId),
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

    this.loadingSignal.set(true);
    this.reportsApi.createReport({
      periodMonth: this.selectedMonthSignal(),
      periodYear: this.selectedYearSignal(),
      buildingId: this.currentBuildingId(),
      generatedByUserId: this.currentGeneratedByUserId(),
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

  getRefillsForReport(report: Report): ReportRefillResource[] {
    return this.refillsForPeriod(report.periodMonth, report.periodYear);
  }

  getCurrentBuildingId(): number {
    return this.currentBuildingId();
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

  private enrichReport(report: Report): Report {
    const totals = this.calculateRefillTotals(report.periodMonth, report.periodYear);
    const hasMatchingRefills = totals.count > 0;
    return {
      ...report,
      refillCount: hasMatchingRefills ? totals.count : report.refillCount,
      totalLiters: hasMatchingRefills ? totals.liters : report.totalLiters,
      totalCostSoles: hasMatchingRefills ? totals.costSoles : report.totalCostSoles,
    };
  }

  private calculateRefillTotals(month: number, year: number) {
    const refills = this.refillsForPeriod(month, year);

    return {
      count: refills.length,
      liters: refills.reduce((total, refill) => total + Number(refill.liters || 0), 0),
      costSoles: refills.reduce(
        (total, refill) => total + Number(refill.costSoles ?? refill.cost_soles ?? 0),
        0,
      ),
    };
  }

  private refillsForPeriod(month: number, year: number): ReportRefillResource[] {
    return this.refillsSignal().filter((refill) => {
      const dateValue = refill.refillDate ?? refill.refill_date;
      const buildingId = refill.buildingId ?? refill.building_id;
      if (!dateValue || buildingId !== this.currentBuildingId()) return false;
      const date = new Date(dateValue);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });
  }

  private toPeriodKey(month: number, year: number): string {
    return `${year}-${month.toString().padStart(2, '0')}`;
  }

  private lastMonths(count: number): ReportPeriod[] {
    return Array.from({ length: count }, (_, index) => {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - index, 1);
      return {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    });
  }

  private currentBuildingId(): number {
    return this.authenticationStore.currentUser()?.buildingId ?? this.fallbackBuildingId;
  }

  private currentGeneratedByUserId(): number {
    return this.authenticationStore.currentUser()?.userId ?? this.fallbackGeneratedByUserId;
  }
}
