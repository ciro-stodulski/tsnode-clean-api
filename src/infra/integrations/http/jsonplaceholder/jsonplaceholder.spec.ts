import nock from 'nock';
import { expect } from 'chai';
import Sinon from 'sinon';
import { JsonPlaceHolderIntegration, HttpClient } from '..';
import { JsonPlaceHolderUser } from '../../../../core/types';
import { UserNotFoundError } from '../../../../core/exceptions';
import { env } from '../../../../shared';

describe('JsonPlaceHolderIntegration', () => {
  const sandbox = Sinon.createSandbox();
  const url = 'https://jsonplaceholder.typicode.com';

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    sandbox.replace(env, 'json_place_holder_url', url);
  });

  describe('#getUser', () => {
    it('should return user', async () => {
      const mock_user: JsonPlaceHolderUser = {
        company: {
          bs: 'yolo',
          catchPhrase: 'yolo',
          name: 'yolo',
        },
        email: 'yolo@yolo.com',
        id: 1,
        name: 'yolo',
        phone: 'yolo',
        username: 'yolo',
        website: 'yolo',
        address: {
          city: 'yolo',
          geo: {
            lat: 'yolo',
            lng: 'yolo',
          },
          street: 'yolo',
          suite: 'yolo',
          zipcode: 'yolo',
        },
      };

      const fake_id = 'yolo';
      const nock_instance = nock(url);

      nock_instance.get(`/users/${fake_id}`).reply(200, mock_user);

      const http = new HttpClient();
      const json_placeholder_integration = new JsonPlaceHolderIntegration(http);

      const response = await json_placeholder_integration.getUser(fake_id);

      expect(response).to.be.eql(mock_user);
    });

    it('should return error user not found', async () => {
      const fake_id = 'yolo';
      const nock_instance = nock(url);

      nock_instance.get(`/users/${fake_id}`).reply(404);

      let err = null;
      try {
        const http = new HttpClient();
        const json_placeholder_integration = new JsonPlaceHolderIntegration(
          http
        );

        await json_placeholder_integration.getUser(fake_id);
      } catch (error) {
        err = error;
      }

      expect(err).to.be.instanceOf(UserNotFoundError);
    });
  });
});
