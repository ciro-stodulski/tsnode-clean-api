import {  TodoService } from '../../../infra/services';
import { ServiceCaseContext, InfraContext } from '.';

export const make_service_context = (
  infra_context: InfraContext
): ServiceCaseContext => {
  const {
    json_place_holder_integration,
  } = infra_context;

  return {
    todo_service: new TodoService(
      json_place_holder_integration,
    ),
  };
};
