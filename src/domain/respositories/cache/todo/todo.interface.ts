import { Todo } from 'src/domain/entities';

export interface ITodoCache {
  list(): Promise<Todo[]>;
  save(todos: Todo[]): Promise<void>;
}
