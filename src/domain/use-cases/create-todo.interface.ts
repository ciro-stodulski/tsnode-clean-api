import { Todo } from '../entities';

export interface ICreateTodoUseCase {
  create(dto: Todo): Promise<string>;
}
