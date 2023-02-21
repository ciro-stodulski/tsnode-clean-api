import { Todo } from 'src/domain/entities';
import { JsonPlaceHolderUserDto } from 'src/domain/dto';

export interface ITodoService {
  create(dto: Todo): Promise<string>;
  getUser(id: string): Promise<JsonPlaceHolderUserDto>;
  list(): Promise<Todo[]>;
}
