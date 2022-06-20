import { Container } from './container';
import { CliModule, Module, HttpModule } from './modules';

export class App {
  private cli_module: Module;

  private http_module: Module;

  constructor({ cli = null, http = null }) {
    const container = new Container();

    this.http_module =
      http ||
      new HttpModule(container);
    this.cli_module = cli || new CliModule(container);
  }

  start(): void {
    this.http_module.start();
    this.cli_module.start();
  }
}
