import { Query, Resolver } from 'type-graphql';
import { TodoResponse } from '../..';
import { TodoStatus } from '../../../../core/entities';

@Resolver()
export class TodoResolver {
  @Query(() => [TodoResponse])
  async getTodos(): Promise<TodoResponse[]> {
    return [
      {
        name: 'GYN',
        status: TodoStatus.Active,
        user: '1',
      },
    ];
  }
}
