import { UserNotFoundError } from '../../../../core/exceptions';
import { Http, HttpErrorCode } from '..';
import { IJsonPlaceHolderIntegration } from '../../../../core/ports';
import { JsonPlaceHolderUser } from '../../../../core/types';

export class JsonPlaceHolderIntegration implements IJsonPlaceHolderIntegration {
  constructor(private readonly http: Http) {
    http.createInstance({
      base_url: 'https://jsonplaceholder.typicode.com',
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
