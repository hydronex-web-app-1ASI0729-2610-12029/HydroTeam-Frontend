import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Report, ReportStatus } from '../domain/model/report.entity';
import { ReportResource, ReportsResponse } from './reports-response';

export class ReportAssembler implements BaseAssembler<Report, ReportResource, ReportsResponse> {
  toEntityFromResource(resource: ReportResource): Report {
    const totalLiters = resource.total_water_liters
      ?? resource.totalWaterLiters
      ?? resource.total_liters
      ?? resource.totalLiters
      ?? 0;

    return {
      id: resource.id,
      generatedAt: resource.generated_at ?? resource.generatedAt ?? new Date().toISOString(),
      periodMonth: resource.period_month ?? resource.periodMonth ?? 1,
      periodYear: resource.period_year ?? resource.periodYear ?? new Date().getFullYear(),
      refillCount: resource.refill_count ?? resource.refillCount ?? this.estimateRefillCount(totalLiters),
      totalLiters,
      totalCostSoles: resource.total_cost_soles ?? resource.totalCostSoles ?? 0,
      status: this.toStatus(resource.status),
      buildingId: resource.building_id ?? resource.buildingId,
      generatedByUserId: resource.generated_by_user_id ?? resource.generatedByUserId,
    };
  }

  toResourceFromEntity(entity: Report): ReportResource {
    return {
      id: entity.id,
      period_month: entity.periodMonth,
      period_year: entity.periodYear,
      total_cost_soles: entity.totalCostSoles,
      total_water_liters: entity.totalLiters,
      refill_count: entity.refillCount,
      generated_at: entity.generatedAt,
      status: entity.status,
      building_id: entity.buildingId,
      generated_by_user_id: entity.generatedByUserId,
    };
  }

  toEntitiesFromResponse(response: ReportsResponse): Report[] {
    return response.reports.map((resource) => this.toEntityFromResource(resource));
  }

  private estimateRefillCount(totalLiters: number): number {
    return totalLiters > 0 ? Math.max(1, Math.round(totalLiters / 5000)) : 0;
  }

  private toStatus(status: string | undefined): ReportStatus {
    return status === 'shared' ? 'shared' : 'generated';
  }
}
