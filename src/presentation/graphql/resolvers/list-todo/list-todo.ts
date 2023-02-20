import { Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Container } from 'src/main/container';
import { TodoResponse } from 'src/presentation/graphql';
import 'reflect-metadata';

@Service()
@Resolver()
export class ListTodoResolver {
  constructor(@Inject('container') private container: Container) {}

  @Query(() => [TodoResponse])
  async getTodos(): Promise<TodoResponse[]> {
    return this.container.list_todo_use_case.list();
  }
}
