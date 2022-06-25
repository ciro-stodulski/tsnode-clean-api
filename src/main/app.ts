import { validateOrReject, ValidationError } from 'class-validator';
import { env } from './env';
import { Container } from './container';
import { CliModule, Module, HttpModule, AmqpModule } from './modules';

export class App {
  private cli_module: Module;

  private http_module: Module;

  private amqp_module: Module;

  constructor({ cli = null, http = null, amqp = null }) {
    const container = new Container();

    this.cli_module = cli || new CliModule(container);
    this.http_module = http || new HttpModule(container, env.http_port);
    this.amqp_module =
      amqp ||
      new AmqpModule(container, {
        host: env.rabbit_mq_host,
        password: env.rabbit_mq_password,
        port: env.rabbit_mq_port,
        protocol: env.rabbit_mq_protocol,
        username: env.rabbit_mq_username,
        vhost: env.rabbit_mq_vhost,
      });
  }

  start(): void {
    this.throwEnvValidatorErrors();

    this.http_module.start();
    this.cli_module.start();
    this.amqp_module.start();
  }

  async throwEnvValidatorErrors(): Promise<void> {
    try {
      await validateOrReject(env);
    } catch (errors_validations: any) {
      const errors: ValidationError[] = errors_validations;
      for (const item of errors) {
        for (const key in item.constraints) {
          if (key) {
            const message = item.constraints[key];
            console.error(message);
          }
        }
      }
      throw new Error('Errors to validate envs');
    }
  }
}
