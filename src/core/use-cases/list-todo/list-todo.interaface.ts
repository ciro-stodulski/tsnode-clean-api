import { Todo } from '../../entities';

export interface IListTodoUseCase {
  list(): Promise<Todo[]>;
}
