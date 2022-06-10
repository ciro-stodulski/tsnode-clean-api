import { ITodoRepository } from '../../ports';
import { Todo, TodoLifeCycle } from '../../entities';
import { ICreateTodoUseCase } from './create-todo.interface';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(private todo_repository: ITodoRepository) {}

  create(dto: Todo): string {
    const new_todo = new Todo(dto);

    this.todo_repository.create(new_todo);

    return TodoLifeCycle.CreateSuccess;
  }
}
