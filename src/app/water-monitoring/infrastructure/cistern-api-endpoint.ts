import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Cistern } from '../domain/model/cistern.entity';
import { CisternResource, CisternResponse } from './cistern-response';
import { CisternAssembler } from './cistern-assembler';

const baseUrl = environment.databaseProviderApiBaseUrl;
const cisternPath = environment.databaseProviderCisternsEndpointPath;

export class CisternApiEndpoint extends BaseApiEndpoint<
  Cistern,
  CisternResource,
  CisternResponse,
  CisternAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${baseUrl}${cisternPath}`, new CisternAssembler());
  }
}
