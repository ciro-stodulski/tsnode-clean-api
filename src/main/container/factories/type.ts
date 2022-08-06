import { ITodoService } from '../../../core/ports';
import {
  ITodoCache,
  ITodoRepository,
  ITodoCollection,
} from '../../../infra/repositories';
import {
  IJsonPlaceHolderIntegration,
  ITodoProducer,
} from '../../../infra/integrations';

export type InfraContext = {
  todo_repository: ITodoRepository;
  todo_cache: ITodoCache;
  json_place_holder_integration: IJsonPlaceHolderIntegration;
  todo_producer: ITodoProducer;
  todo_collection: ITodoCollection;
};

export type ServiceCaseContext = {
  todo_service: ITodoService;
};
