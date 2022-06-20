import {
  CreateTodoUseCase,
  ICreateTodoUseCase,
  IListTodoUseCase,
  ListTodoUseCase,
} from '../../core/use-cases';
import { TodoRepository } from '../../infra/repositories';
import { UseCaseContext } from '.';
import {
  HttpClient,
  JsonPlaceHolderIntegration,
} from '../../infra/integrations/http';

export class Container {
  readonly list_todo_use_case: IListTodoUseCase;

  readonly create_todo_use_case: ICreateTodoUseCase;

  constructor() {
    const client_http = new HttpClient();

    const use_case_context: UseCaseContext = {
      todo_repository: new TodoRepository([]),
      json_place_holder_integration: new JsonPlaceHolderIntegration(
        client_http
      ),
    };

    this.list_todo_use_case = new ListTodoUseCase(use_case_context);
    this.create_todo_use_case = new CreateTodoUseCase(use_case_context);
  }
}
