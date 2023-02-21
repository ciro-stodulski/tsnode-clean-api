import { Container as ContainerTypedi } from 'typedi';
import { CreateTodoResolver, ListTodoResolver } from 'src/presentation/graphql';
import { Module } from 'src/main/modules';
import { ApolloServerAdapter } from 'src/infra/adapters';
import { Container } from 'src/main/container';
import { logger } from 'src/shared/logger';

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
