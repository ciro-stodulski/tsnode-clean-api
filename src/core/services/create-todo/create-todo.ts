import { InfraContext } from '../../../main/container';
import { IJsonPlaceHolderIntegration, ITodoRepository } from '../../ports';
import { Todo } from '../../entities';
import { ICreateTodoService } from '..';
import { JsonPlaceHolderUser } from '../../types';

export class CreateTodoService implements ICreateTodoService {
  private todo_repository: ITodoRepository;

  private json_place_holder_integration: IJsonPlaceHolderIntegration;

  constructor(infra_context: InfraContext) {
    this.todo_repository = infra_context.todo_repository;
    this.json_place_holder_integration =
      infra_context.json_place_holder_integration;
  }

  getUser(id: string): Promise<JsonPlaceHolderUser> {
    return this.json_place_holder_integration.getUser(id);
  }

  create(todo: Todo): Promise<string> {
    return this.todo_repository.save(todo);
  }
}
