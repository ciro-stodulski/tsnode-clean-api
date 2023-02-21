import { JsonPlaceHolderUserDto } from 'src/domain/dto';

export interface IJsonPlaceHolderIntegration {
  getUser(id: string): Promise<JsonPlaceHolderUserDto>;
}
