import Knex from 'knex';
import {
  Repository,
  TableConfig,
  ITodoRepository,
} from 'src/infra/repositories';
import { Todo } from 'src/domain/entities';

export class TodoRepository
  extends Repository<Todo>
  implements ITodoRepository
{
  config_table: TableConfig = {
    name: 'todos',
  };

  protected properties: string[] = ['name', 'status', 'user'];

  constructor(protected database: Knex) {
    super();
  }

  save(todo: Todo): Promise<string> {
    return this.create(todo);
  }

  async list(): Promise<Todo[]> {
    return this.transactionable();
  }
}
