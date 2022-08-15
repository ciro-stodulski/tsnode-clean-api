import { validateOrReject, ValidationError } from 'class-validator';
import { env } from '../shared/env';
import { Container } from './container';
import {
  Module,
  HttpModule,
  AmqpModule,
  GraphQLModule,
  MongodbModule,
  GrpcModule,
} from './modules';
import { logger } from '../shared/logger';

export class App {
  private modules: Module[];

  constructor(
    { http = null, amqp = null, graphql = null, mongodb = null, grpc = null },
    container = undefined
  ) {
    this.loadModules(
      { http, amqp, graphql, mongodb, grpc },
      container || new Container()
    );
  }

  async restart(): Promise<void> {
    this.modules.forEach(module => module.close());

    this.loadModules({}, new Container());

    await this.start();
  }

  loadModules(
    { http = null, amqp = null, graphql = null, mongodb = null, grpc = null },
    container: Container
  ): void {
    this.modules = [
      mongodb || new MongodbModule(),
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
      grpc || new GrpcModule(container),
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
            logger.error('env fail:', message);
          }
        }
      }
      throw new Error('Errors to validate envs');
    }
  }
}
