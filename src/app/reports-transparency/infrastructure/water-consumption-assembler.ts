import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { WaterConsumptionResource, WaterConsumptionsResponse } from './water-consumption-response';

export class WaterConsumptionAssembler
  implements BaseAssembler<WaterConsumption, WaterConsumptionResource, WaterConsumptionsResponse>
{
  toEntityFromResource(resource: WaterConsumptionResource): WaterConsumption {
    return {
      id: resource.id,
      periodStart: resource.period_start ?? resource.periodStart ?? '',
      periodEnd: resource.period_end ?? resource.periodEnd ?? '',
      avgDailyLiters: resource.avg_daily_liters ?? resource.avgDailyLiters ?? 0,
      totalPeriodLiters: resource.total_period_liters ?? resource.totalPeriodLiters ?? 0,
      buildingId: resource.building_id ?? resource.buildingId,
    };
  }

  toResourceFromEntity(entity: WaterConsumption): WaterConsumptionResource {
    return {
      id: entity.id,
      period_start: entity.periodStart,
      period_end: entity.periodEnd,
      avg_daily_liters: entity.avgDailyLiters,
      total_period_liters: entity.totalPeriodLiters,
      building_id: entity.buildingId,
    };
  }

  toEntitiesFromResponse(response: WaterConsumptionsResponse): WaterConsumption[] {
    return response.water_consumptions.map((resource) => this.toEntityFromResource(resource));
  }
}
