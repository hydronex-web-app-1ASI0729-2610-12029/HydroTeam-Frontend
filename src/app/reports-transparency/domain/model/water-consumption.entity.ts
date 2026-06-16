import { BaseEntity } from '../../../shared/domain/model/base-entity';

export interface WaterConsumption extends BaseEntity {
  id: number;
  periodStart: string;
  periodEnd: string;
  avgDailyLiters: number;
  totalPeriodLiters: number;
  buildingId?: number;
}
