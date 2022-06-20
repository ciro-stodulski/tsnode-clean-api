import { JsonPlaceHolderUser } from '../types';

export interface IJsonPlaceHolderIntegration {
  getUser(id: string): Promise<JsonPlaceHolderUser>;
}
