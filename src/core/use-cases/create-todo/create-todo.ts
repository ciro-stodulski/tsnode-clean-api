import { UseCaseContext } from '../../../main/container';
import { ITodoRepository } from '../../ports';
import { Todo, TodoLifeCycle } from '../../entities';
import { ICreateTodoUseCase } from '..';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  private todo_repository: ITodoRepository;

  constructor(use_case_context: UseCaseContext) {
    this.todo_repository = use_case_context.todo_repository;
  }

  create(dto: Todo): string {
    const new_todo = new Todo(dto);

    this.todo_repository.create(new_todo);

    return TodoLifeCycle.CreateSuccess;
  }
}
