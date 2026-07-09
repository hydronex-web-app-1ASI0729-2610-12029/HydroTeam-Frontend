import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Cistern } from '../domain/model/cistern.entity';
import { CisternResource, CisternResponse } from './cistern-response';

export class CisternAssembler implements BaseAssembler<Cistern, CisternResource, CisternResponse> {
  toEntityFromResource(resource: CisternResource): Cistern {
    return new Cistern({
      id: resource.id,
      capacityLiters: resource.capacityLiters,
      currentLevelPercent: resource.currentLevelPercent,
      alertThresholdPercent: resource.alertThresholdPercent,
      buildingId: resource.buildingId,
    });
  }

  toResourceFromEntity(entity: Cistern): CisternResource {
    return {
      id: entity.id,
      capacityLiters: entity.capacityLiters,
      currentLevelPercent: entity.currentLevelPercent,
      alertThresholdPercent: entity.alertThresholdPercent,
      buildingId: entity.buildingId,
    } as CisternResource;
  }

  toEntitiesFromResponse(response: CisternResponse): Cistern[] {
    return response.cisterns.map((r) => this.toEntityFromResource(r));
  }
}
