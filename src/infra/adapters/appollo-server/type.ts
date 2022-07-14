import { NonEmptyArray } from 'type-graphql';
import { Container } from '../../../main/container';

export type ResolverType = {
  resolver: NonEmptyArray<Function>;
  container: Container
};
