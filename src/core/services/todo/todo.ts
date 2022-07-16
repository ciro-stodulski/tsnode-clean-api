import { InfraContext } from '../../../main/container';
import {
  IJsonPlaceHolderIntegration,
  ITodoCache,
  ITodoCollection,
  ITodoProducer,
  ITodoRepository,
} from '../../ports';
import { Todo } from '../../entities';
import { ITodoService } from '..';
import { JsonPlaceHolderUser } from '../../types';

export class TodoService implements ITodoService {
  private todo_repository: ITodoRepository;

  private todo_collection: ITodoCollection;

  private json_place_holder_integration: IJsonPlaceHolderIntegration;

  private todo_cache: ITodoCache;

  private todo_producer: ITodoProducer;

  constructor(infra_context: InfraContext) {
    this.todo_repository = infra_context.todo_repository;
    this.json_place_holder_integration =
      infra_context.json_place_holder_integration;
    this.todo_cache = infra_context.todo_cache;
    this.todo_producer = infra_context.todo_producer;
    this.todo_collection = infra_context.todo_collection;
  }

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

    console.info(['list by mongo'], await this.todo_collection.list());

    if (todo_in_cache.length === 0) {
      const todo_repository = await this.todo_repository.list();
      this.todo_cache.save(todo_repository);

      return todo_repository;
    }

    return todo_in_cache;
  }
}
