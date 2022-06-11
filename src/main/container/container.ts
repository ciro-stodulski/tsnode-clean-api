import { CreateTodoUseCase } from '../../core/use-cases';
import { TodoRepository } from '../../infra/repositories';
import { ICreateTodoCommand , CreateTodoCommand} from '../../interface';
import { UseCaseContext } from '.';

export class Container {
  readonly create_todo_command: ICreateTodoCommand;

  constructor() {
    const use_case_context: UseCaseContext = {
      todo_repository: new TodoRepository([]),
    };

    const create_todo_use_case = new CreateTodoUseCase(use_case_context);

    this.create_todo_command = new CreateTodoCommand(create_todo_use_case);
  }
}
