import {
GetUserUseCase,
IGetUserUseCase
} from '../../core/use-cases';

import { logger } from '../../shared';
import { ContainerConfig } from '.';
import { make_infra_context, make_service_context } from './factories';

export class Container extends ContainerConfig {
  readonly get_user_use_case: IGetUserUseCase;

  constructor() {
    super();

    const { todo_service } = make_service_context(
      make_infra_context()
    );

    this.get_user_use_case = new GetUserUseCase(todo_service);


    logger.info('Container: load use cases with successfully');
  }
}
