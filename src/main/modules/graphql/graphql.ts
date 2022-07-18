import { Container as ContainerTypedi } from 'typedi';
import {
  CreateTodoResolver,
  ListTodoResolver,
} from '../../../interface/graphql';
import { Module } from '..';
import { ApolloServerAdapter } from '../../../infra/adapters';
import { Container } from '../../container';
import { logger } from '../../../shared/logger';

export class GraphQLModule extends ApolloServerAdapter implements Module {
  constructor(private container: Container, private port: number) {
    super();
    this.resolvers = [ListTodoResolver, CreateTodoResolver];
  }

  async start(): Promise<void> {
    ContainerTypedi.set('container', this.container);

    await this.startingServer();

    this.server.listen({
      port: this.port,
    });

    logger.info(`Graphql: Server starting in port ${this.port}`);
  }

  close(): void {
    this.server.stop();
    logger.warn('Graphql: disconnecting');
  }
}
