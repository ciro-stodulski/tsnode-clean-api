import { CliLine, ConfigCommand } from '.';

export abstract class Command {
  abstract readonly config_command: ConfigCommand;

  abstract run(line: CliLine): Promise<void>;

  abstract error(error: any): Promise<void>;
}
