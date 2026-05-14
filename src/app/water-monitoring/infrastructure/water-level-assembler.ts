import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { WaterLevel } from '../domain/model/water-level.entity';
import { WaterLevelResource, WaterLevelResponse } from './water-level-response';

export class WaterLevelAssembler
  implements BaseAssembler<WaterLevel, WaterLevelResource, WaterLevelResponse>
{
  toEntityFromResource(resource: WaterLevelResource): WaterLevel {
    return new WaterLevel({
      id: resource.id,
      levelPercent: resource.levelPercent,
      recordedAt: resource.recordedAt,
    });
  }

  toResourceFromEntity(entity: WaterLevel): WaterLevelResource {
    return {
      id: entity.id,
      levelPercent: entity.levelPercent,
      recordedAt: entity.recordedAt,
    } as WaterLevelResource;
  }

  toEntitiesFromResponse(response: WaterLevelResponse): WaterLevel[] {
    return response.waterLevels.map((r) => this.toEntityFromResource(r));
  }
}
