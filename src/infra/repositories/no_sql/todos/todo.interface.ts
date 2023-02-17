import { Todo } from '../../../../domain/entities';

export interface ITodoCollection {
  save(todo: Todo): Promise<void>;
  list(): Promise<Todo[]>;
}
