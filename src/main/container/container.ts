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
import { InfraContext, UseCaseContext } from '.';
import {
  HttpClient,
  JsonPlaceHolderIntegration,
} from '../../infra/integrations/http';
import { AmqpClient, TodoProducer } from '../../infra/integrations/amqp';
import { Knex } from '../../infra/adapters';
import { env } from '../env';
import { TodoService } from '../../core/services';

export class Container {
  readonly list_todo_use_case: IListTodoUseCase;
  readonly create_todo_use_case: ICreateTodoUseCase;

  constructor() {
    const db = new Knex();
    db.isConnection();

    const cache_client = new CacheClient();

    const amqp_client = new AmqpClient({
      host: env.rabbit_mq_host,
      password: env.rabbit_mq_password,
      port: env.rabbit_mq_port,
      protocol: env.rabbit_mq_protocol,
      username: env.rabbit_mq_username,
      vhost: env.rabbit_mq_vhost,
    });

    const infra_context: InfraContext = {
      todo_cache: new TodoCache(cache_client),
      todo_repository: new TodoRepository(db.getConnection()),
      json_place_holder_integration: new JsonPlaceHolderIntegration(
        new HttpClient()
      ),
      todo_producer: new TodoProducer(amqp_client),
    };

    const service_context: UseCaseContext = {
      todo_service: new TodoService(infra_context),
    };

    this.list_todo_use_case = new ListTodoUseCase(service_context.todo_service);

    this.create_todo_use_case = new CreateTodoUseCase(
      service_context.todo_service
    );

    //this.classes = [this.list_todo_use_case, this.create_todo_use_case];
  }
}
