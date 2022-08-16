import { TodoService } from '../../../infra/services';
import { ServiceCaseContext, InfraContext } from '.';

export const make_service_todo_context = (
  infra_context: InfraContext
): ServiceCaseContext => {
  const {
    json_place_holder_integration,
    todo_cache,
    todo_collection,
    todo_producer,
    todo_repository,
  } = infra_context;

  return {
    todo_service: new TodoService(
      todo_repository,
      todo_collection,
      json_place_holder_integration,
      todo_cache,
      todo_producer
    ),
  };
};
