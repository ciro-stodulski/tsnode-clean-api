import { assert, expect } from 'chai';
import sinon from 'sinon';
import { TodoStatus } from '../../entities';
import { JsonPlaceHolderUser } from '../../types';
import { CreateTodoService } from '..';

describe('Service - CreateTodoService', () => {
  describe('create', () => {
    it('Should create todo with succeffully', async () => {
      const result_db = 'yolo';
      const todo_repository_mock = {
        save: sinon.fake.resolves(result_db),
      };

      const infra_context = {
        todo_repository: todo_repository_mock,
      };

      // @ts-ignore
      const use_case = new CreateTodoService(infra_context);

      const dto = {
        name: 'GYN',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const result = await use_case.create(dto);
      expect(result).to.be.equals(result_db);

      assert(todo_repository_mock.save.calledOnceWith(dto));
    });
  });

  describe('getUser', () => {
    it('Should create todo with succeffully', async () => {
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

      const json_place_holder_integration_mock = {
        getUser: sinon.fake.resolves(mock_user),
      };

      const infra_context = {
        json_place_holder_integration: json_place_holder_integration_mock,
      };
      // @ts-ignore
      const use_case = new CreateTodoService(infra_context);
      const fake_id = 'yolo';
      const result = await use_case.getUser(fake_id);

      expect(result).to.be.equals(mock_user);
      assert(
        json_place_holder_integration_mock.getUser.calledOnceWith(fake_id)
      );
    });
  });
});
