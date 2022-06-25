import { ICreateTodoService, IListService } from '../../core/services';
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

export type UseCaseContext = {
  create_todo_service: ICreateTodoService;
  list_todo_service: IListService;
};
