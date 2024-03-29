import { Field, ObjectType } from 'type-graphql';
import { TodoStatus } from 'src/domain/entities';

@ObjectType()
export class TodoResponse {
  @Field()
  name: string;

  @Field()
  status: TodoStatus;

  @Field()
  user: string;
}
