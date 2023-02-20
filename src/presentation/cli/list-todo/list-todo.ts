import { Command, ConfigCommand } from 'src/presentation/cli';
import { logger } from 'src/shared/logger';
import { Container } from 'src/main/container';
import { MongodbModule } from 'src/main/modules';

export class ListTodoCommand implements Command {
  config_command: ConfigCommand = {
    name: 'list-todo',
    description: 'command to list a todo',
    modules: [new MongodbModule()],
  };

  constructor(private container: Container) {}

  async run(): Promise<void> {
    const result = await this.container.list_todo_use_case.list();

    logger.info(result);
  }

  async error(error: any): Promise<void> {
    logger.error(error);
  }
}
