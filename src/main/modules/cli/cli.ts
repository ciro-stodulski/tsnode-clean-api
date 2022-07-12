import readline from 'readline';
import { CreateTodoCommand, ICreateTodoCommand } from '../../../interface/cli';
import { Container } from '../../container';
import { Module } from '..';

export class CliModule implements Module {
  private program: readline.Interface;

  private commands: ICreateTodoCommand;

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

  close(): void {}

  start(): void {
    console.info('Cli:App started');
    this.program.on('line', async (line: string) => {
      try {
        const result = await this.commands.cmd(JSON.parse(line));
        // eslint-disable-next-line
        console.info(result!.result);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
