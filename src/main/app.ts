import { validateOrReject, ValidationError } from 'class-validator';
import { env } from './env';
import { Container } from './container';
import {
  CliModule,
  Module,
  HttpModule,
  AmqpModule,
  GraphQLModule,
} from './modules';

export class App {
  private modules: Module[];

  constructor(
    { cli = null, http = null, amqp = null, graphql = null },
    container = undefined
  ) {
    this.loadModules(
      { cli, http, amqp, graphql },
      container || new Container()
    );
  }

  async restart(): Promise<void> {
    this.modules.forEach(module => module.close());

    this.loadModules({}, new Container());

    await this.start();
  }

  loadModules(
    { cli = null, http = null, amqp = null, graphql = null },
    container: Container
  ): void {
    this.modules = [
      cli || new CliModule(container),
      http || new HttpModule(container, env.http_port),
      graphql || new GraphQLModule(container, env.graphql_port),
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

    this.modules.forEach(async module => module.start());
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
