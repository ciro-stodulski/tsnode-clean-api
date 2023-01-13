import { JsonPlaceHolderUser } from '../../types';

export interface IGetUserUseCase {
  get(id: string): Promise<JsonPlaceHolderUser>
}
