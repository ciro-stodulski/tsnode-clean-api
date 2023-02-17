import { ICreateTodoUseCase } from '../../../../domain/use-cases';
import {
  RouteConfig,
  HttpRequest,
  create_todo_schema,
  Controller,
  AuthMiddleware,
  NotFoundError,
} from '../..';
import { UserNotFoundError } from '../../../../domain/exceptions';

export class CreateTodoController implements Controller {
  route_configs: RouteConfig = {
    method: 'post',
    path: '/todos',
    status_code: 201,
    schema: create_todo_schema,
    middlewares: [new AuthMiddleware()],
  };

  constructor(private create_todo_use_case: ICreateTodoUseCase) {}

  async handle(req: HttpRequest): Promise<void> {
    await this.create_todo_use_case.create(req.body);
  }

  exception(error: Error): Error {
    if (error instanceof UserNotFoundError) {
      const { code, message } = error;

      return new NotFoundError(code, message);
    }

    return error;
  }
}
