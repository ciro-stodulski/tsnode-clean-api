import { Todo } from 'src/domain/entities';
import { IListTodoUseCase } from 'src/domain/use-cases';
import { ITodoService } from 'src/domain/services';

export class ListTodoUseCase implements IListTodoUseCase {
  constructor(private todo_service: ITodoService) {}

  async list(): Promise<Todo[]> {
    return this.todo_service.list();
  }
}
