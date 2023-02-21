import { NotificationService, TodoService } from 'src/infra/services';
import { ServiceCaseContext, InfraContext } from 'src/main/container/factories';

export const make_service_context = (
  infra_context: InfraContext
): ServiceCaseContext => {
  const {
    json_place_holder_integration,
    todo_cache,
    todo_collection,
    todo_producer,
    todo_repository,
    notification_proto,
    notification_producer,
  } = infra_context;

  return {
    todo_service: new TodoService(
      todo_repository,
      todo_collection,
      json_place_holder_integration,
      todo_cache,
      todo_producer
    ),
    notification_service: new NotificationService(
      notification_proto,
      notification_producer
    ),
  };
};
