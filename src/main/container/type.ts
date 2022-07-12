import { ITodoService } from '../../core/services';
import {
  IJsonPlaceHolderIntegration,
  ITodoCache,
  ITodoProducer,
  ITodoRepository,
} from '../../core/ports';

export type InfraContext = {
  todo_repository: ITodoRepository;
  todo_cache: ITodoCache;
  json_place_holder_integration: IJsonPlaceHolderIntegration;
  todo_producer: ITodoProducer;
};

export type UseCaseContext = {
  todo_service: ITodoService;
};
