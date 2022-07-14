import { Field, ObjectType } from 'type-graphql';
import { TodoStatus } from '../../../../core/entities';

@ObjectType()
export class CreateTodoResponse {
  @Field()
  name: string;

  @Field()
  status: TodoStatus;

  @Field()
  user: string;
}
