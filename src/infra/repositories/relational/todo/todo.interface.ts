import { Todo } from '../../../../core/entities';

export interface ITodoRepository {
  save(todo: Todo): Promise<string>;
  list(): Promise<Todo[]>;
}
