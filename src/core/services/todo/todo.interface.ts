import { JsonPlaceHolderUser } from '../../types';
import { Todo } from '../../entities';

export interface ITodoService {
  create(dto: Todo): Promise<string>;
  getUser(id: string): Promise<JsonPlaceHolderUser>;
  list(): Promise<Todo[]>;
}
