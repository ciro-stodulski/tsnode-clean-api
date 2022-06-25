import { JsonPlaceHolderUser } from '../../types';
import { Todo } from '../../entities';

export interface ICreateTodoService {
  create(dto: Todo): Promise<string>;
  getUser(id: string): Promise<JsonPlaceHolderUser>;
}
