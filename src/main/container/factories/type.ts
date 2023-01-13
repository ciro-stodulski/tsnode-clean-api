import { ITodoService } from '../../../core/ports';

import {
  IJsonPlaceHolderIntegration,
} from '../../../infra/integrations';

export type InfraContext = {
  json_place_holder_integration: IJsonPlaceHolderIntegration;
};

export type ServiceCaseContext = {
  todo_service: ITodoService;
};
