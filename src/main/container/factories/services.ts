import { TodoService } from '../../../infra/services';
import { ServiceCaseContext, InfraContext } from '.';

export const makeServiceContext = (
  infra_context: InfraContext
): ServiceCaseContext => {
  return {
    todo_service: new TodoService(infra_context)
  }
};
