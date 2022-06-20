import { IJsonPlaceHolderIntegration, ITodoRepository } from '../../core/ports';

export type UseCaseContext = {
  todo_repository: ITodoRepository;
  json_place_holder_integration: IJsonPlaceHolderIntegration;
};
