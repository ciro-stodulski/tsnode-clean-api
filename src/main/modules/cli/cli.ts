import { Command, ListTodoCommand } from 'src/presentation/cli';
import { Container } from 'src/main/container';
import { Module } from 'src/main/modules';
import { CommanderAdapter } from 'src/infra/adapters';

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
