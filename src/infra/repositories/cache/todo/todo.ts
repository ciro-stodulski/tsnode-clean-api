import { Todo } from '../../../../core/entities';
import { CacheClient, ITodoCache } from '../..';

export class TodoCache implements ITodoCache {
  constructor(private cache: CacheClient) {}

  async save(todos: Todo[]): Promise<void> {
    await this.cache.setWithExpirationTime(
      'todos',
      JSON.stringify(todos),
      6000
    );
  }

  async list(): Promise<Todo[]> {
    const todos = await this.cache.get('todos');

    if (!todos) {
      return [];
    }

    return JSON.parse(todos);
  }
}
