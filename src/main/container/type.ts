import {
  IJsonPlaceHolderIntegration,
  ITodoCache,
  ITodoRepository,
} from '../../core/ports';

export type InfraContext = {
  todo_repository: ITodoRepository;
  todo_cache: ITodoCache;
  json_place_holder_integration: IJsonPlaceHolderIntegration;
};
