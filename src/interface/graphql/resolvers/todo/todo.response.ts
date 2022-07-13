import { Field, ObjectType } from 'type-graphql';
import { TodoStatus } from '../../../../core/entities';

@ObjectType()
export class TodoResponse {
  @Field()
  name: string;

  @Field()
  status: TodoStatus;

  @Field()
  user: string;
}
