import { Todo } from '../../entities';
import { IListTodoUseCase } from '..';
import { IListService } from '../../services';

export class ListTodoUseCase implements IListTodoUseCase {
  constructor(private list_todo_service: IListService) {}

  async list(): Promise<Todo[]> {
    return this.list_todo_service.list();
  }
}
