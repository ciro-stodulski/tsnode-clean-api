import { Todo } from '../../../../core/entities';
import { IListTodoUseCase } from '../../../../core/use-cases';

import { HttpResponse, Controller, RouteConfig } from '../..';

export class ListTodoController extends Controller {
  route_configs: RouteConfig = {
    method: 'get',
    path: '/todos',
    status_code: 200,
  };

  constructor(private list_todo_use_case: IListTodoUseCase) {
    super();
  }

  async handle(): Promise<HttpResponse<Todo[]>> {
    const todos = await this.list_todo_use_case.list();

    return {
      data: todos,
    };
  }

  exception(error: Error): Error {
    return error;
  }
}
