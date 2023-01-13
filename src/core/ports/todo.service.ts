import { JsonPlaceHolderUser } from '../types';

export interface ITodoService {
  getUser(id: string): Promise<JsonPlaceHolderUser>;
}
