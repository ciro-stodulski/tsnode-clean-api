import { ICreateTodoUseCase } from '../../../core/use-cases';
import { CliLine, CliResult, ICreateTodoCommand } from '..';

export class CreateTodoCommand implements ICreateTodoCommand {
  constructor(private create_todo_use_case: ICreateTodoUseCase) {}

  async cmd(cmd: CliLine): Promise<CliResult<string>> {
    const result = await this.create_todo_use_case.create(cmd.line);

    return {
      result,
    };
  }
}
