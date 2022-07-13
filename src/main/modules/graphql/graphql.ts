import { TodoResolver } from '../../../interface/graphql';
import { Module } from '..';
import { ApolloServerAdapter } from '../../../infra/adapters';

export class GraphQLModule extends ApolloServerAdapter implements Module {
  constructor(private port: number) {
    super();
    this.resolvers = [TodoResolver];
  }

  async start(): Promise<void> {
    await this.startingServer();

    this.server.listen({ port: this.port });

    console.info(`Graphql: Server starting in port ${this.port}`);
  }

  close(): void {
    this.server.stop();
  }
}
