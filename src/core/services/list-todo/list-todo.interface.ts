import { Todo } from '../../entities';

export interface IListService {
  list(): Promise<Todo[]>;
}
