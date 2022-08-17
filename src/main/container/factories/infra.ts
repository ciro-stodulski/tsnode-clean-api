import {
  CacheClient,
  TodoCache,
  TodoCollection,
  TodoRepository,
} from '../../../infra/repositories';
import {
  HttpClient,
  JsonPlaceHolderIntegration,
  TodoProducer,
  AmqpClient,
  NotificationPB,
  IGRPCClient,
  NotificationProducer,
} from '../../../infra/integrations';

import { InfraContext } from '.';
import { KnexAdapter } from '../../../infra/adapters';

export const make_infra_context = (
  cache_client: CacheClient,
  db_client: KnexAdapter,
  amqp_client: AmqpClient,
  grpc_client: IGRPCClient
): InfraContext => {
  return {
    todo_collection: new TodoCollection(),
    todo_cache: new TodoCache(cache_client),
    todo_repository: new TodoRepository(db_client.getConnection()),
    json_place_holder_integration: new JsonPlaceHolderIntegration(
      new HttpClient()
    ),
    todo_producer: new TodoProducer(amqp_client),
    notification_proto: new NotificationPB(grpc_client),
    notification_producer: new NotificationProducer(amqp_client),
  };
};
