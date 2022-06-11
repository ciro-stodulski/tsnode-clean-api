import { CliResult, CliLine } from '../..';

export interface ICreateTodoCommand {
  cmd(line: CliLine): CliResult | void;
}
