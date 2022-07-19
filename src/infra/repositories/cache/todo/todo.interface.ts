import { Todo } from '../../../../core/entities';

export interface ITodoCache {
  list(): Promise<Todo[]>;
  save(todos: Todo[]): Promise<void>;
}
