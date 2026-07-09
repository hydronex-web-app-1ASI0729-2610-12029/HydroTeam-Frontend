import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Cistern } from '../domain/model/cistern.entity';
import { CisternResource, CisternResponse } from './cistern-response';
import { CisternAssembler } from './cistern-assembler';

export class CisternApiEndpoint extends BaseApiEndpoint<
  Cistern,
  CisternResource,
  CisternResponse,
  CisternAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${environment.monitoringApiBaseUrl}/cisterns`, new CisternAssembler());
  }
}
