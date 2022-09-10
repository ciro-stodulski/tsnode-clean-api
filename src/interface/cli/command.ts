import { CliLine, ConfigCommand } from '.';

export interface Command {
  config_command: ConfigCommand;

  run(line: CliLine): Promise<void>;

  error(error: any): Promise<void>;
}
