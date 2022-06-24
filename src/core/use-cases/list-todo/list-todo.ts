import { Todo } from '../../entities';
import { ITodoRepository } from '../../ports';
import { IListTodoUseCase } from '..';
import { InfraContext } from '../../../main/container';

export class ListTodoUseCase implements IListTodoUseCase {
  private todo_repository: ITodoRepository;

  constructor(infra_context: InfraContext) {
    this.todo_repository = infra_context.todo_repository;
  }

  async list(): Promise<Todo[]> {
    return this.todo_repository.list();
  }
}
