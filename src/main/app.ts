import { Container } from './container';
import { CliModule, Module, HttpModule, BaseAMQP } from './modules';

export class App {
  private cli_module: Module;

  private http_module: Module;

  private amqp_module: Module;

  constructor({ cli = null, http = null, amqp = null }) {
    const container = new Container();

    this.cli_module = cli || new CliModule(container);
    this.http_module = http || new HttpModule(container, 3000);
    this.amqp_module =
      amqp ||
      new BaseAMQP(container, {
        host: 'localhost',
        password: 'admin',
        port: 5672,
        protocol: 'amqp',
        username: 'admin',
        vhost: '/',
      });
  }

  start(): void {
    this.http_module.start();
    this.cli_module.start();
    this.amqp_module.start();
  }
}
