import { UseCaseContext } from '../../../main/container';
import { IJsonPlaceHolderIntegration, ITodoRepository } from '../../ports';
import { Todo, TodoLifeCycle } from '../../entities';
import { ICreateTodoUseCase } from '..';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  private todo_repository: ITodoRepository;

  private json_place_holder_integration: IJsonPlaceHolderIntegration;

  constructor(use_case_context: UseCaseContext) {
    this.todo_repository = use_case_context.todo_repository;
    this.json_place_holder_integration =
      use_case_context.json_place_holder_integration;
  }

  async create(dto: Todo): Promise<string> {
    const user_json = await this.json_place_holder_integration.getUser(
      dto.user
    );

    const new_todo = new Todo({
      name: dto.name,
      status: dto.status,
      user: user_json.name,
    });

    this.todo_repository.create(new_todo);

    return TodoLifeCycle.CreateSuccess;
  }
}
