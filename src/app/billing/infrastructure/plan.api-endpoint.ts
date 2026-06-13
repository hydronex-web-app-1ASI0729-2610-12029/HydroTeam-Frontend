import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Plan} from '../domain/model/plan.entity';
import {PlanResource, PlanResponse} from './plan.response';
import {PlanAssembler} from './plan.assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const baseUrl = environment.databaseProviderApiBaseUrl;
const planPath = environment.databaseProviderPlansEndpointPath;

/**
 * This is the endpoint to interactive with API, just in the path plan.
 */
export class PlanApiEndpoint extends BaseApiEndpoint<Plan, PlanResource, PlanResponse, PlanAssembler>{

  constructor(http: HttpClient) {
    super(http, `${baseUrl}${planPath}`, new PlanAssembler());
  }

}
