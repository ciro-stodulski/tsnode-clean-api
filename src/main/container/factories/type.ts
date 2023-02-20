import { INotificationService, ITodoService } from 'src/domain/services';
import {
  ITodoCache,
  ITodoRepository,
  ITodoCollection,
} from 'src/infra/repositories';
import {
  IJsonPlaceHolderIntegration,
  INotificationProducer,
  INotificationProto,
  ITodoProducer,
} from 'src/infra/integrations';

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
