import { CliResult, CliLine } from '..';

export interface ICreateTodoCommand {
  cmd(line: CliLine): Promise<CliResult | void>;
}
