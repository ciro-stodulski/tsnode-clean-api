import { Todo } from '../../../../domain/entities';

export interface ITodoCache {
  list(): Promise<Todo[]>;
  save(todos: Todo[]): Promise<void>;
}
