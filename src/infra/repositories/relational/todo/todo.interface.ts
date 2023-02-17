import { Todo } from '../../../../domain/entities';

export interface ITodoRepository {
  save(todo: Todo): Promise<string>;
  list(): Promise<Todo[]>;
}
