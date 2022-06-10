import { CreateTodoUseCase } from '../../core/use-cases';
import { ITodoRepository } from '../../core/ports';
import { TodoRepository } from '../../infra/repositories';
import { CreateTodoCommand } from '../../interface/cli';

export type UseCaseContext = {
  todo_repository: ITodoRepository;
};

export class Container {
  readonly create_todo_command: CreateTodoCommand;

  constructor() {
    const use_case_context: UseCaseContext = {
      todo_repository: new TodoRepository([]),
    };

    const create_todo_use_case = new CreateTodoUseCase(use_case_context);

    this.create_todo_command = new CreateTodoCommand(create_todo_use_case);
  }
}
