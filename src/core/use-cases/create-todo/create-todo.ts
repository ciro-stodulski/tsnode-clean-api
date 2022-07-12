import { Todo } from '../../entities';
import { ICreateTodoUseCase } from '..';
import { ITodoService } from '../../services';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(private todo_service: ITodoService) {}

  async create(dto: Todo): Promise<string> {
    const user_json = await this.todo_service.getUser(dto.user);

    const new_todo = new Todo({
      name: dto.name,
      status: dto.status,
      user: user_json.name,
    });

    return this.todo_service.create(new_todo);
  }
}
