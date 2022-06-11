import { ITodoRepository } from '../../core/ports';

export type UseCaseContext = {
  todo_repository: ITodoRepository;
};
