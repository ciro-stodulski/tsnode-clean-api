import { UserNotFoundError } from 'src/domain/exceptions';
import { Http, HttpErrorCode } from 'src/infra/integrations';
import { JsonPlaceHolderUser } from 'src/domain/types';
import { env } from 'src/shared';
import { IJsonPlaceHolderIntegration } from 'src/domain/integrations';

export class JsonPlaceHolderIntegration implements IJsonPlaceHolderIntegration {
  constructor(private readonly http: Http) {
    http.createInstance({
      base_url: env.json_place_holder_url,
    });
  }

  async getUser(id: string): Promise<JsonPlaceHolderUser> {
    try {
      const result = await this.http.get<JsonPlaceHolderUser>(`/users/${id}`);

      return result.data;
    } catch (error) {
      if (error.response.status === Number(HttpErrorCode.NOT_FOUND)) {
        throw new UserNotFoundError();
      }

      throw error;
    }
  }
}
