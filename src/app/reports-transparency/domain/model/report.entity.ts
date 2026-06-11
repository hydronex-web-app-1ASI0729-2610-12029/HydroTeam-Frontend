export type ReportStatus = 'generated' | 'shared';

export interface Report {
  id: string;
  generatedAt: string;
  periodMonth: number;
  periodYear: number;
  refillCount: number;
  totalLiters: number;
  totalCostSoles: number;
  status: ReportStatus;
}
