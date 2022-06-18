import { Container } from './container';
import { CliModule, Module, HttpModule } from './modules';
import { CreateTodoController, ListTodoController } from '../interface/http';

export class App {
  private cli_module: Module;

  private http_module: Module;

  constructor({ cli = null, http = null }) {
    const container = new Container();

    this.http_module =
      http ||
      new HttpModule([
        new ListTodoController(container.list_todo_use_case),
        new CreateTodoController(container.create_todo_use_case),
      ]);
    this.cli_module = cli || new CliModule(container);
  }

  start(): void {
    this.http_module.start();
    this.cli_module.start();
  }
}
