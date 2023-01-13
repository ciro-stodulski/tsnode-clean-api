import { Command, ConfigCommand } from '..';
import { logger } from '../../../shared/logger';
import { Container } from '../../../main/container';

export class ListTodoCommand implements Command {
  config_command: ConfigCommand = {
    name: 'list-todo',
    description: 'command to list a todo',
  };

  constructor(private container: Container) {}

  async run(): Promise<void> {
    const result = await this.container.get_user_use_case.get('1');

    logger.info(result);
  }

  async error(error: any): Promise<void> {
    logger.error(error);
  }
}
