import { Arg, Mutation, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Container } from 'src/main/container';
import { TodoDto } from 'src/presentation/graphql';

@Service()
@Resolver()
export class CreateTodoResolver {
  constructor(@Inject('container') private container: Container) {}

  @Mutation(() => Boolean)
  async createTodos(@Arg('dto', () => TodoDto) dto: TodoDto): Promise<boolean> {
    await this.container.create_todo_use_case.create(dto);

    return true;
  }
}
