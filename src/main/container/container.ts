import {
  CreateTodoUseCase,

  ListTodoUseCase,
  VerifyNotificationUseCase,
} from '../../application/use-cases';

import {
  ICreateTodoUseCase,
  IListTodoUseCase,
  IVerifyNotificationUseCase,
} from '../../domain/use-cases'

import { logger } from '../../shared';
import { ContainerConfig } from '.';
import { make_infra_context, make_service_context } from './factories';

export class Container extends ContainerConfig {
  readonly list_todo_use_case: IListTodoUseCase;

  readonly create_todo_use_case: ICreateTodoUseCase;

  readonly verify_notification_use_case: IVerifyNotificationUseCase;

  constructor() {
    super();

    const { todo_service, notification_service } = make_service_context(
      make_infra_context(
        this.client_cache,
        this.db,
        this.amqp_client,
        this.grpc_client
      )
    );

    this.list_todo_use_case = new ListTodoUseCase(todo_service);

    this.create_todo_use_case = new CreateTodoUseCase(
      todo_service,
      notification_service
    );

    this.verify_notification_use_case = new VerifyNotificationUseCase(
      notification_service
    );

    logger.info('Container: load use cases with successfully');
  }
}
