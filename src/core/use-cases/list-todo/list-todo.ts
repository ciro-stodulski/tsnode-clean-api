import { Todo } from '../../entities';
import { ITodoRepository } from '../../ports';
import { IListTodoUseCase } from '..';
import { UseCaseContext } from '../../../main/container';

export class ListTodoUseCase implements IListTodoUseCase {
  private todo_repository: ITodoRepository;

  constructor(use_case_context: UseCaseContext) {
    this.todo_repository = use_case_context.todo_repository;
  }

  list(): Todo[] {
    return this.todo_repository.list();
  }
}
