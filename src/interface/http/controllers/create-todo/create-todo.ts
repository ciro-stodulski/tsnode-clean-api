import { ICreateTodoUseCase } from '../../../../core/use-cases';
import {
  RouteConfig,
  HttpRequest,
  create_todo_schema,
  Controller,
  AuthMiddleware,
} from '../..';

export class CreateTodoController extends Controller {
  route_configs: RouteConfig = {
    method: 'post',
    path: '/todos',
    status_code: 201,
    schema: create_todo_schema,
    middlewares: [new AuthMiddleware()],
  };

  constructor(private create_todo_use_case: ICreateTodoUseCase) {
    super();
  }

  async handle(req: HttpRequest): Promise<void> {
    this.create_todo_use_case.create(req.body);
  }

  exception(error: Error): Error {
    return error;
  }
}
