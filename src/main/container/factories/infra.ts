import {
  HttpClient,
  JsonPlaceHolderIntegration,
} from '../../../infra/integrations';

import { InfraContext } from '.';

export const make_infra_context = (
): InfraContext => {
  return {
    json_place_holder_integration: new JsonPlaceHolderIntegration(
      new HttpClient()
    ),
  };
};
