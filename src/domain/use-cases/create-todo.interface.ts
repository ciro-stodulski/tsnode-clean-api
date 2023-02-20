import { Todo } from 'src/domain/entities';

export interface ICreateTodoUseCase {
  create(dto: Todo): Promise<string>;
}
