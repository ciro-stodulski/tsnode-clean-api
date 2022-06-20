import nock from 'nock';
import { expect } from 'chai';
import { JsonPlaceHolderIntegration, HttpClient } from '..';
import { JsonPlaceHolderUser } from '../../../../core/types';
import { UserNotFoundError } from '../../../../core/exceptions';

describe('JsonPlaceHolderIntegration', () => {
  const nock_instance = nock(`https://jsonplaceholder.typicode.com`);

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

      const http = new HttpClient();
      const json_placeholder_integration = new JsonPlaceHolderIntegration(http);

      const fake_id = 'yolo';

      nock_instance.get(`/users/${fake_id}`).reply(200, mock_user);

      const response = await json_placeholder_integration.getUser(fake_id);

      expect(response).to.be.eql(mock_user);
    });

    it('should return error user not found', async () => {
      const user: JsonPlaceHolderUser = {
        company: {
          bs: '',
          catchPhrase: '',
          name: '',
        },
        email: '',
        id: 1,
        name: '',
        phone: '',
        username: '',
        website: '',
        address: {
          city: '',
          geo: {
            lat: '',
            lng: '',
          },
          street: '',
          suite: '',
          zipcode: '',
        },
      };

      const http = new HttpClient();
      const json_placeholder_integration = new JsonPlaceHolderIntegration(http);

      const fake_id = 'yolo';

      nock_instance.get(`/users/${fake_id}`).reply(404, user);

      let err = null;
      try {
        await json_placeholder_integration.getUser(fake_id);
      } catch (error) {
        err = error;
      }

      expect(err).to.be.not.eql(null);
      expect(err).to.be.instanceOf(UserNotFoundError);
    });
  });
});
