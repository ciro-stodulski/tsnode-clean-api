import { Todo, TodoLifeCycle } from '../../entities';
import { ICreateTodoUseCase } from './create-todo.interface';

export class CreateTodoUseCase implements ICreateTodoUseCase {
  create(dto: Todo): string {
    const new_todo = new Todo(dto);

    console.log('create user in repository');

    return TodoLifeCycle.CreateSuccess;
  }
}
