import { Todo } from '../../../domain/entities';
import { IListTodoUseCase } from '../../../domain/use-cases';
import { ITodoService } from '../../../domain/services';

export class ListTodoUseCase implements IListTodoUseCase {
  constructor(private todo_service: ITodoService) {}

  async list(): Promise<Todo[]> {
    return this.todo_service.list();
  }
}
