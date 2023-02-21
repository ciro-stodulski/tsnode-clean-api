import { Todo } from 'src/domain/entities';

export interface ITodoRepository {
  save(todo: Todo): Promise<string>;
  list(): Promise<Todo[]>;
}
