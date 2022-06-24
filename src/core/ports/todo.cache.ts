import { Todo } from '../entities';

export interface ITodoCache {
  list(): Promise<Todo[]>;
  save(todos: Todo[]): Promise<void>;
}
