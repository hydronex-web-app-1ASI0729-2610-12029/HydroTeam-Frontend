import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionResource, SubscriptionResponse} from './subscription.response';
import {SubscriptionAssembler} from './subscription.assembler';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

const baseUrl = environment.databaseProviderApiBaseUrl;
const subscriptionPath = environment.databaseProviderSubscriptionsEndpointPath;

/**
 * This is the endpoint to interactive with the API, just in the path billing.
 */
export class SubscriptionApiEndpoint extends BaseApiEndpoint<Subscription, SubscriptionResource, SubscriptionResponse, SubscriptionAssembler>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${baseUrl}${subscriptionPath}`, new SubscriptionAssembler());
  }

}
