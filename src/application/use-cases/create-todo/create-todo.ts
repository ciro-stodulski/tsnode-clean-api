import { Todo } from '../../../domain/entities';
import { ICreateTodoUseCase } from '../../../domain/use-cases';
import { INotificationService, ITodoService } from '../../../domain/services';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(
    private todo_service: ITodoService,
    private notification_service: INotificationService
  ) {}

  async create(dto: Todo): Promise<string> {
    const user_json = await this.todo_service.getUser(dto.user);

    const new_todo = new Todo({
      name: dto.name,
      status: dto.status,
      user: user_json.name,
    });

    const result = await this.todo_service.create(new_todo);

    const event = {
      describe: dto.status,
      name: dto.name,
    };

    await this.notification_service.sendNotify(event);

    return result;
  }
}
