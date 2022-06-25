import { Todo } from '../../entities';
import { ICreateTodoUseCase } from '..';
import { ICreateTodoService } from '../../services';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(private create_todo_service: ICreateTodoService) {}

  async create(dto: Todo): Promise<string> {
    const user_json = await this.create_todo_service.getUser(dto.user);

    const new_todo = new Todo({
      name: dto.name,
      status: dto.status,
      user: user_json.name,
    });

    return this.create_todo_service.create(new_todo);
  }
}
