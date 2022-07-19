import { JsonPlaceHolderUser } from '../../../../core/types';

export interface IJsonPlaceHolderIntegration {
  getUser(id: string): Promise<JsonPlaceHolderUser>;
}
