import { IJsonPlaceHolderIntegration } from '../../integrations';
import { ITodoService } from '../../../core/ports';
import { JsonPlaceHolderUser } from '../../../core/types';

export class TodoService implements ITodoService {
  constructor(
    private json_place_holder_integration: IJsonPlaceHolderIntegration,
  ) {}

  getUser(id: string): Promise<JsonPlaceHolderUser> {
    return this.json_place_holder_integration.getUser(id);
  }
}
