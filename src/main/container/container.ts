import {
  CreateTodoUseCase,
  ICreateTodoUseCase,
  IListTodoUseCase,
  ListTodoUseCase,
} from '../../core/use-cases';
import { TodoRepository } from '../../infra/repositories';
import { InfraContext } from '.';
import {
  HttpClient,
  JsonPlaceHolderIntegration,
} from '../../infra/integrations/http';
import { Knex } from '../modules/db';

export class Container {
  readonly list_todo_use_case: IListTodoUseCase;

  readonly create_todo_use_case: ICreateTodoUseCase;

  constructor() {
    const client_http = new HttpClient();

    const db_connection = new Knex().getConnection();

    const infra_context: InfraContext = {
      todo_repository: new TodoRepository(db_connection),
      json_place_holder_integration: new JsonPlaceHolderIntegration(
        client_http
      ),
    };

    this.list_todo_use_case = new ListTodoUseCase(infra_context);
    this.create_todo_use_case = new CreateTodoUseCase(infra_context);
  }
}
