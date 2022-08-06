import {
  CreateTodoUseCase,
  ICreateTodoUseCase,
  IListTodoUseCase,
  ListTodoUseCase,
} from '../../core/use-cases';

import { logger } from '../../shared';
import { ContainerConfig } from '.';
import { makeInfraContext, makeServiceContext } from './factories';

export class Container extends ContainerConfig {
  readonly list_todo_use_case: IListTodoUseCase;
  readonly create_todo_use_case: ICreateTodoUseCase;

  constructor() {
    super();

    const todo_service = makeServiceContext(
      makeInfraContext(this.client_cache, this.db, this.amqp_client)
    ).todo_service;

    this.list_todo_use_case = new ListTodoUseCase(todo_service);

    this.create_todo_use_case = new CreateTodoUseCase(todo_service);

    logger.info('Container: load use cases with successfully');
  }
}
