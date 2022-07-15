import 'reflect-metadata';
import { buildSchema, NonEmptyArray, ResolverData } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { Container } from 'typedi';
import { TransformationContext } from 'typescript';

export class ApolloServerAdapter {
  public server: ApolloServer;

  public resolvers: NonEmptyArray<Function>;

  async startingServer(): Promise<void> {
    const schema = await buildSchema({
      container: ({ context }: ResolverData<TransformationContext>) =>
        Container,
      resolvers: this.resolvers,
      emitSchemaFile: path.resolve(
        __dirname,
        '../../../interface/graphql/schema.gql'
      ),
    });

    this.server = new ApolloServer({
      schema,
    });
  }
}
