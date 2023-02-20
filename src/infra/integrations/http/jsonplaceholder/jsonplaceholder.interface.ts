import { JsonPlaceHolderUser } from 'src/domain/types';

export interface IJsonPlaceHolderIntegration {
  getUser(id: string): Promise<JsonPlaceHolderUser>;
}
