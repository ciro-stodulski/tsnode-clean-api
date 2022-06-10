import { Todo } from '../../entities';
import { ITodoRepository } from '../../ports';
import { IListTodoUseCase } from '..';

export class ListTodoUseCase implements IListTodoUseCase {
  constructor(private todo_repository: ITodoRepository) {}

  list(): Todo[] {
    return this.todo_repository.list();
  }
}
