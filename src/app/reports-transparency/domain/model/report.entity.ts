import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type ReportStatus = 'generated' | 'shared';

export interface Report extends BaseEntity {
  id: number;
  generatedAt: string;
  periodMonth: number;
  periodYear: number;
  refillCount: number;
  totalLiters: number;
  totalCostSoles: number;
  status: ReportStatus;
  buildingId?: number;
  generatedByUserId?: number;
}
