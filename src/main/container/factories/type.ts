import { ITodoCache, ITodoCollection, ITodoRepository } from 'src/domain/respositories';
import { INotificationService, ITodoService } from 'src/domain/services';

import {
  IJsonPlaceHolderIntegration,
  INotificationProducer,
  INotificationProto,
  ITodoProducer,
} from 'src/domain/integrations';

export type InfraContext = {
  todo_repository: ITodoRepository;
  todo_cache: ITodoCache;
  json_place_holder_integration: IJsonPlaceHolderIntegration;
  todo_producer: ITodoProducer;
  todo_collection: ITodoCollection;
  notification_producer: INotificationProducer;
  notification_proto: INotificationProto;
};

export type ServiceCaseContext = {
  todo_service: ITodoService;
  notification_service: INotificationService;
};
