import { Container } from './container/container';
import { CliModule } from './modules';

export class App {
  private cli_module: CliModule;

  constructor({ cli = null }) {
    const container = new Container();

    this.cli_module = cli || new CliModule(container);
  }

  start(): void {
    this.cli_module.start();
  }
}
