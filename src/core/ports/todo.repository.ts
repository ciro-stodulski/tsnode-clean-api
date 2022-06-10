import { Todo } from '../entities';

export interface ITodoRepository {
  create(dto: Todo): void;
  list(): Todo[];
}
