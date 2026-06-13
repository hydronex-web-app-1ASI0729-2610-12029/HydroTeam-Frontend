import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Cistern } from '../domain/model/cistern.entity';
import { CisternResource, CisternResponse } from './cistern-response';

export class CisternAssembler
  implements BaseAssembler<Cistern, CisternResource, CisternResponse>
{
  toEntityFromResource(resource: CisternResource): Cistern {
    return new Cistern({
      id: resource.id,
      capacityLiters: resource.capacity_liters,
      currentLevelPercent: resource.current_level_percent,
      alertThresholdPercent: resource.alert_threshold_percent,
      buildingId: resource.building_id,
    });
  }

  toResourceFromEntity(entity: Cistern): CisternResource {
    return {
      id: entity.id,
      capacity_liters: entity.capacityLiters,
      current_level_percent: entity.currentLevelPercent,
      alert_threshold_percent: entity.alertThresholdPercent,
      building_id: entity.buildingId,
    } as CisternResource;
  }

  toEntitiesFromResponse(response: CisternResponse): Cistern[] {
    return response.cisterns.map((r) => this.toEntityFromResource(r));
  }
}
