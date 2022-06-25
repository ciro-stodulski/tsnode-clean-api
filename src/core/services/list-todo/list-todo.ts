import { Todo } from '../../entities';
import { ITodoCache, ITodoRepository } from '../../ports';
import { IListService } from '..';
import { InfraContext } from '../../../main/container';

export class ListTodoService implements IListService {
  private todo_repository: ITodoRepository;
  private todo_cache: ITodoCache;

  constructor(infra_context: InfraContext) {
    this.todo_repository = infra_context.todo_repository;
    this.todo_cache = infra_context.todo_cache;
  }

  async list(): Promise<Todo[]> {
    const todo_in_cache = await this.todo_cache.list();
    if (todo_in_cache.length === 0) {
      const todo_repository = await this.todo_repository.list();
      this.todo_cache.save(todo_repository);

      return todo_repository;
    }

    return todo_in_cache;
  }
}
