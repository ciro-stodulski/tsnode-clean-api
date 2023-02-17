import { Command, ListTodoCommand } from '../../../presentation/cli';
import { Container } from '../../container';
import { Module } from '..';
import { CommanderAdapter } from '../../../infra/adapters';

export class CliModule extends CommanderAdapter implements Module {
  commands: Command[];

  constructor(protected container: Container) {
    super();
    this.commands = [new ListTodoCommand(container)];
  }

  async start(): Promise<void> {
    await this.processCommand();
  }

  close(): void {}
}
