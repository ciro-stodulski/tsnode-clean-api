import { Field, InputType } from 'type-graphql';
import { Todo, TodoStatus } from 'src/domain/entities';

@InputType()
export class TodoDto implements Partial<Todo> {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  status: TodoStatus;

  @Field({ nullable: true })
  user: string;
}
