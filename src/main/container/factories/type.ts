import { INotificationService, ITodoService } from '../../../domain/services';
import {
  ITodoCache,
  ITodoRepository,
  ITodoCollection,
} from '../../../infra/repositories';
import {
  IJsonPlaceHolderIntegration,
  INotificationProducer,
  INotificationProto,
  ITodoProducer,
} from '../../../infra/integrations';

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
