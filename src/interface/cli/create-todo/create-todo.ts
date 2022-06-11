import { ICreateTodoUseCase } from '../../../core/use-cases';
import { CliLine, CliResult, ICreateTodoCommand } from '../..';

export class CreateTodoCommand implements ICreateTodoCommand {
  constructor(private create_todo_use_case: ICreateTodoUseCase) {}

  cmd(cmd: CliLine): CliResult<string> {
    const result = this.create_todo_use_case.create(cmd.line);

    return {
      result,
    };
  }
}
