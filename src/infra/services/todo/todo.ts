import { InfraContext } from '../../../main/container/factories';
import {
  ITodoCache,
  ITodoCollection,
  ITodoRepository,
} from '../../repositories';
import { IJsonPlaceHolderIntegration, ITodoProducer } from '../../integrations';
import { Todo } from '../../../core/entities';
import { ITodoService } from '../../../core/ports';
import { JsonPlaceHolderUser } from '../../../core/types';
import { logger } from '../../../shared/logger';

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
