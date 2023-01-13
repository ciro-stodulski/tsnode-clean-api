import { Todo } from '../../../../core/entities';
import { IGetUserUseCase } from '../../../../core/use-cases';

import { HttpResponse, Controller, RouteConfig, HttpRequest } from '../..';
import { JsonPlaceHolderUser } from '../../../../core/types';

export class ListTodoController implements Controller {
  route_configs: RouteConfig = {
    method: 'get',
    path: '/user',
    status_code: 200,
  };

  constructor(private get_user_use_case: IGetUserUseCase) {}

  async handle({query}: HttpRequest): Promise<HttpResponse<JsonPlaceHolderUser>> {
    const user = await this.get_user_use_case.get(query.id);

    return {
      data: user,
    };
  }

  exception(error: Error): Error {
    return error;
  }
}
