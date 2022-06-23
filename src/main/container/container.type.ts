import { IJsonPlaceHolderIntegration, ITodoRepository } from '../../core/ports';

export type InfraContext = {
  todo_repository: ITodoRepository;
  json_place_holder_integration: IJsonPlaceHolderIntegration;
};
