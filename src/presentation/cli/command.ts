import { CliLine, ConfigCommand } from 'src/presentation/cli';

export interface Command {
  config_command: ConfigCommand;

  run(line: CliLine): Promise<void>;

  error(error: any): Promise<void>;
}
