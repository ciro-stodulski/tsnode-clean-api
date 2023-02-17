import { Field, ObjectType } from 'type-graphql';
import { TodoStatus } from '../../../../domain/entities';

@ObjectType()
export class TodoResponse {
  @Field()
  name: string;

  @Field()
  status: TodoStatus;

  @Field()
  user: string;
}
