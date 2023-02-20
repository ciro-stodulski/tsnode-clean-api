import { Todo } from 'src/domain/entities';
import { IListTodoUseCase } from 'src/domain/use-cases';

import { HttpResponse, Controller, RouteConfig } from 'src/presentation/http';

export class ListTodoController implements Controller {
  route_configs: RouteConfig = {
    method: 'get',
    path: '/todos',
    status_code: 200,
  };

  constructor(private list_todo_use_case: IListTodoUseCase) {}

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
