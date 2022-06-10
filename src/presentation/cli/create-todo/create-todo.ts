import { ICreateTodoUseCase } from '../../../core/use-cases';
import { CliLine, CliResult } from '..';
import { Cli } from '../';

export class CreateTodoCommand extends Cli {
  constructor(private create_todo_use_case: ICreateTodoUseCase) {
    super();
  }

  cmd(cmd: CliLine): CliResult<string> {
    const result = this.create_todo_use_case.create(cmd.line);

    return {
      result,
    };
  }
}
