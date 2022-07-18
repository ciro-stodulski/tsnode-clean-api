import { Command, ConfigCommand } from '..';
import { logger } from '../../../shared/logger';
import { Container } from '../../../main/container';
import { MongodbModule } from '../../../main/modules';

export class ListTodoCommand extends Command {
  config_command: ConfigCommand = {
    name: 'list-todo',
    description: 'command to list a todo',
    modules: [new MongodbModule()],
  };

  constructor(private container: Container) {
    super();
  }

  async run(): Promise<void> {
    const result = await this.container.list_todo_use_case.list();

    logger.info(result);
  }

  async error(error: any): Promise<void> {
    logger.error(error);
  }
}
