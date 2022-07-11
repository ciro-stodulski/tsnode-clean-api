import { validateOrReject, ValidationError } from 'class-validator';
import { env } from './env';
import { Container } from './container';
import { CliModule, Module, HttpModule, AmqpModule } from './modules';

export class App {
  private modules: Module[];

  constructor({ cli = null, http = null, amqp = null }, init_container = null) {
    this.modules = this.loadModules({ cli, http, amqp }, init_container);
  }

  async restart(): Promise<void> {
    this.modules.forEach(module => module.close());

    this.start();
  }

  loadModules(
    { cli = null, http = null, amqp = null },
    init_container: null
  ): Module[] {
    const container = init_container || new Container();

    return [
      cli || new CliModule(container),
      http || new HttpModule(container, env.http_port),
      amqp ||
        new AmqpModule(container, {
          host: env.rabbit_mq_host,
          password: env.rabbit_mq_password,
          port: env.rabbit_mq_port,
          protocol: env.rabbit_mq_protocol,
          username: env.rabbit_mq_username,
          vhost: env.rabbit_mq_vhost,
        }),
    ];
  }

  async start(): Promise<void> {
    await this.throwEnvValidatorErrors();

    this.modules.forEach(module => module.start());
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
