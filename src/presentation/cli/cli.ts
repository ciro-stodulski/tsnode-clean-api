import { CliResult } from '.';
import { CliLine } from '.';

export abstract class Cli {
  abstract cmd(line: CliLine): CliResult | void;
}
