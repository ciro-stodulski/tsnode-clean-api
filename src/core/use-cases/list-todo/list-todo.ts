import { Todo } from '../../entities';
import { IListTodoUseCase } from '..';
import { ITodoService } from '../../ports';

export class ListTodoUseCase implements IListTodoUseCase {
  constructor(private todo_service: ITodoService) {}

  async list(): Promise<Todo[]> {
    return this.todo_service.list();
  }
}
