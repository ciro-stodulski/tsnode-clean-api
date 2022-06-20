import {
  CreateTodoUseCase,
  ICreateTodoUseCase,
  IListTodoUseCase,
  ListTodoUseCase,
} from '../../core/use-cases';
import { TodoRepository } from '../../infra/repositories';
import { UseCaseContext } from '.';

export class Container {
  readonly list_todo_use_case: IListTodoUseCase;

  readonly create_todo_use_case: ICreateTodoUseCase;

  constructor() {
    const use_case_context: UseCaseContext = {
      todo_repository: new TodoRepository([]),
    };

    this.list_todo_use_case = new ListTodoUseCase(use_case_context);
    this.create_todo_use_case = new CreateTodoUseCase(use_case_context);
  }
}
