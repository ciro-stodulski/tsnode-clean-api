import { JsonPlaceHolderUser } from '../../../../domain/types';

export interface IJsonPlaceHolderIntegration {
  getUser(id: string): Promise<JsonPlaceHolderUser>;
}
