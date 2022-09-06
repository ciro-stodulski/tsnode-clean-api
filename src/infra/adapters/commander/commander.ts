import { Command, OptionValues } from 'commander';
import { table } from 'table';
import { Schema } from 'joi';
import { Command as InterfaceCommand } from '../../../interface/cli';
import {
  remove_all_white_spaces_and_convert_to_lower_case,
  logger,
} from '../../../shared';

export abstract class CommanderAdapter {
  commands: InterfaceCommand[];

  private program: Command;

  constructor() {
    this.program = new Command();
    this.program.option('-lc, --list-commands', 'List commands');
    this.program.option('-rc, --run-command <command>', 'Run command');
  }

  protected getOptions(): OptionValues {
    this.program.parse(process.argv);

    return this.program.opts();
  }

  protected listCommands(): void {
    const data = [['Name', 'Description']];

    this.commands.forEach(command => {
      data.push([
        command.config_command.name,
        command.config_command.description,
      ]);
    });

    logger.info(`\n${table(data)}`);
    process.exit(0);
  }

  protected async processCommand(): Promise<void> {
    const options = this.getOptions();

    if (options.listCommands) {
      this.listCommands();
    } else if (options.runCommand) {
      try {
        await this.runCommand(options.runCommand);
      } catch (error) {
        logger.error(error);
        process.exit(1);
      }
      process.exit(0);
    } else {
      logger.warn(`Command not found`);
      process.exit(1);
    }
  }

  async runCommand(command_name: string): Promise<void> {
    const cmd = this.findCommand(command_name);

    if (cmd.config_command.schema) {
      this.schemaValidator(
        cmd.config_command.schema,
        JSON.parse(process.argv[0])
      );
    }

    if (cmd.config_command.modules) {
      for (const module of cmd.config_command.modules) {
        await module.start();
      }
    }

    try {
      await cmd.run({
        line: process.argv,
      });
    } catch (error) {
      await cmd.error(error);
      logger.error(`${command_name} failed: ${error}`);
      process.exit(1);
    }

    process.exit(0);
  }

  private findCommand(command_name: string): InterfaceCommand {
    const command_name_formatted =
      remove_all_white_spaces_and_convert_to_lower_case(command_name);

    const cmd = this.commands.find(command => {
      return (
        remove_all_white_spaces_and_convert_to_lower_case(
          command.config_command.name
        ) === command_name_formatted
      );
    });

    if (!cmd) {
      logger.warn(`'${command_name}' not found`);
      process.exit(1);
    }

    return cmd;
  }

  private schemaValidator(schema: Schema, input: Object): void {
    const validation = schema.validate(input, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      logger.error(validation.error);
      throw Error('cli: Invalid arg');
    }
  }
}
