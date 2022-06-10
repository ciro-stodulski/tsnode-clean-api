import { Todo } from '../entities';

export interface ITodoRepository {
  create(todo: Todo): void;
  list(): Todo[];
}
