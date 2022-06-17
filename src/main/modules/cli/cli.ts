import readline from 'readline';
import { CreateTodoCommand, ICreateTodoCommand } from '../../../interface/cli';
import { Container } from '../../container';
import { Module } from '..';

export class CliModule implements Module {
  protected program: readline.Interface;

  protected commands: ICreateTodoCommand;

  constructor(protected container: Container, program = null) {
    this.program =
      program ||
      readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
      });

    this.commands = new CreateTodoCommand(container.create_todo_use_case);
  }

  start(): void {
    this.program.on('line', (line: string) => {
      const result = this.commands.cmd(JSON.parse(line));
      // eslint-disable-next-line
      console.log(result!.result);
    });
  }
}
