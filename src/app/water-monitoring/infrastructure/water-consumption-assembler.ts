import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { WaterConsumptionResource, WaterConsumptionResponse } from './water-consumption-response';

export class WaterConsumptionAssembler
  implements BaseAssembler<WaterConsumption, WaterConsumptionResource, WaterConsumptionResponse>
{
  toEntityFromResource(resource: WaterConsumptionResource): WaterConsumption {
    return new WaterConsumption({
      id: resource.id,
      avgDailyLiters: resource.avg_daily_liters,
      buildingId: resource.building_id,
    });
  }

  toResourceFromEntity(entity: WaterConsumption): WaterConsumptionResource {
    return {
      id: entity.id,
      avg_daily_liters: entity.avgDailyLiters,
      building_id: entity.buildingId,
    } as WaterConsumptionResource;
  }

  toEntitiesFromResponse(response: WaterConsumptionResponse): WaterConsumption[] {
    return response.water_consumptions.map((r) => this.toEntityFromResource(r));
  }
}
