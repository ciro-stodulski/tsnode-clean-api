import { Todo } from '../entities';
import { JsonPlaceHolderUser } from '../../domain/types';

export interface ITodoService {
  create(dto: Todo): Promise<string>;
  getUser(id: string): Promise<JsonPlaceHolderUser>;
  list(): Promise<Todo[]>;
}
