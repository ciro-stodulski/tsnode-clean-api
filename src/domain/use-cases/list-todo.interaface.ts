import { Todo } from 'src/domain/entities';

export interface IListTodoUseCase {
  list(): Promise<Todo[]>;
}
