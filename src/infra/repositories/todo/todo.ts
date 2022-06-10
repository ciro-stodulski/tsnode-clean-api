import { Todo } from '../../../core/entities';
import { ITodoRepository } from '../../../core/ports';

export class TodoRepository implements ITodoRepository {
  constructor(private database: Todo[]) {}

  create(todo: Todo): void {
    this.database.push(todo);
  }

  list(): Todo[] {
    return this.database;
  }
}
