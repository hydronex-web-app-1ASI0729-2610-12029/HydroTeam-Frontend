import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { WaterConsumptionResource, WaterConsumptionResponse } from './water-consumption-response';

export class WaterConsumptionAssembler
  implements BaseAssembler<WaterConsumption, WaterConsumptionResource, WaterConsumptionResponse>
{
  toEntityFromResource(resource: WaterConsumptionResource): WaterConsumption {
    return new WaterConsumption({
      id: resource.id,
      periodStart: resource.period_start,
      periodEnd: resource.period_end,
      avgDailyLiters: resource.avg_daily_liters,
      totalPeriodLiters: resource.total_period_liters,
      buildingId: resource.building_id,
    });
  }

  toResourceFromEntity(entity: WaterConsumption): WaterConsumptionResource {
    return {
      id: entity.id,
      period_start: entity.periodStart,
      period_end: entity.periodEnd,
      avg_daily_liters: entity.avgDailyLiters,
      total_period_liters: entity.totalPeriodLiters,
      building_id: entity.buildingId,
    } as WaterConsumptionResource;
  }

  toEntitiesFromResponse(response: WaterConsumptionResponse): WaterConsumption[] {
    return response.water_consumptions.map((r) => this.toEntityFromResource(r));
  }
}
