import {
  CreateTodoUseCase,
  ICreateTodoUseCase,
  IListTodoUseCase,
  ListTodoUseCase,
} from '../../core/use-cases';
import {
  CacheClient,
  TodoCache,
  TodoRepository,
} from '../../infra/repositories';
import { InfraContext } from '.';
import {
  HttpClient,
  JsonPlaceHolderIntegration,
} from '../../infra/integrations/http';
import { Cache, Knex } from '../../infra/db';
import { env } from '../env';

export class Container {
  readonly list_todo_use_case: IListTodoUseCase;

  readonly create_todo_use_case: ICreateTodoUseCase;

  constructor() {
    const db = new Knex();

    db.isConnection();

    const client_http = new HttpClient();
    const cache_client = new CacheClient(
      new Cache().getConnection({ host: env.redis_host, port: env.redis_port })
    );

    const infra_context: InfraContext = {
      todo_cache: new TodoCache(cache_client),
      todo_repository: new TodoRepository(db.getConnection()),
      json_place_holder_integration: new JsonPlaceHolderIntegration(
        client_http
      ),
    };

    this.list_todo_use_case = new ListTodoUseCase(infra_context);
    this.create_todo_use_case = new CreateTodoUseCase(infra_context);
  }
}
