import { Query, Resolver } from 'type-graphql';
import { Container } from '../../../../main/container';
import { CreateTodoResponse } from '../..';
import { Inject, Service } from 'typedi';

@Service()
@Resolver()
export class CreateTodoResolver {
  constructor(@Inject('container') private container: Container) {}

  @Query(() => [CreateTodoResponse])
  async createTodos(): Promise<CreateTodoResponse[]> {
    return await this.container.list_todo_use_case.list();
  }
}
