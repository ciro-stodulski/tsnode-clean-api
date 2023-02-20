import { Todo } from 'src/domain/entities';
import { ITodoService } from 'src/domain/services';
import { JsonPlaceHolderUser } from 'src/domain/types';
import { logger } from 'src/shared/logger';
import {
  ITodoCache,
  ITodoCollection,
  ITodoRepository,
} from 'src/domain/respositories';
import {
  IJsonPlaceHolderIntegration,
  ITodoProducer,
} from 'src/domain/integrations';

export class TodoService implements ITodoService {
  constructor(
    private todo_repository: ITodoRepository,
    private todo_collection: ITodoCollection,
    private json_place_holder_integration: IJsonPlaceHolderIntegration,
    private todo_cache: ITodoCache,
    private todo_producer: ITodoProducer
  ) {}

  getUser(id: string): Promise<JsonPlaceHolderUser> {
    return this.json_place_holder_integration.getUser(id);
  }

  async create(todo: Todo): Promise<string> {
    const result = await this.todo_repository.save(todo);

    await this.todo_collection.save(todo);

    await this.todo_producer.notification(todo.name);

    return result;
  }

  async list(): Promise<Todo[]> {
    const todo_in_cache = await this.todo_cache.list();

    const todos_mongo = await this.todo_collection.list();

    logger.info(['list by mongo'], todos_mongo);

    if (todo_in_cache.length === 0) {
      const todo_repository = await this.todo_repository.list();
      this.todo_cache.save(todo_repository);

      return todo_repository;
    }

    return todo_in_cache;
  }
}
