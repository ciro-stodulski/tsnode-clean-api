import { IGetUserUseCase } from '..';
import { ITodoService } from '../../ports';
import { JsonPlaceHolderUser } from '../../types';

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private todo_service: ITodoService) {}

  async get(id: string): Promise<JsonPlaceHolderUser> {
    return this.todo_service.getUser(id);
  }
}
