import 'reflect-metadata';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import path from 'path';

export class ApolloServerAdapter {
  public server: ApolloServer;

  public resolvers: NonEmptyArray<Function> = [() => {}, ...[]];

  async startingServer(): Promise<void> {
    const schema = await buildSchema({
      resolvers: this.resolvers,
      emitSchemaFile: path.resolve(
        __dirname,
        '../../../interface/graphql/schema.gql'
      ),
    });

    this.server = new ApolloServer({ schema });
  }
}
