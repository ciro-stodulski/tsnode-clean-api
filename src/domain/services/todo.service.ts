import { Todo } from 'src/domain/entities';
import { JsonPlaceHolderUser } from 'src/domain/types';

export interface ITodoService {
  create(dto: Todo): Promise<string>;
  getUser(id: string): Promise<JsonPlaceHolderUser>;
  list(): Promise<Todo[]>;
}
