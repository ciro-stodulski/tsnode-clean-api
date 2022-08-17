import { assert, expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../../core/entities';
import { JsonPlaceHolderUser } from '../../../core/types';
import { TodoService } from '..';

describe('Service - TodoService', () => {
  describe('create', () => {
    it('Should create todo with succeffully', async () => {
      const result_db = 'yolo';
      const todo_repository_mock = {
        save: sinon.fake.resolves(result_db),
      };

      const todo_collection = {
        save: sinon.fake.resolves(result_db),
      };

      const todo_producer = {
        notification: sinon.fake.resolves(undefined),
      };

      const infra_context = {};

      const use_case = new TodoService(
        // @ts-ignore
        todo_repository_mock,
        todo_collection,
        null,
        null,
        todo_producer
      );

      const dto = {
        name: 'GYN',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const result = await use_case.create(dto);
      expect(result).to.be.equals(result_db);

      assert(todo_repository_mock.save.calledOnceWith(dto));
      assert(todo_collection.save.calledOnceWith(dto));
      assert(todo_producer.notification.calledOnceWith(dto.name));
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

      const use_case = new TodoService(
        // @ts-ignore
        null,
        null,
        json_place_holder_integration_mock,
        null,
        null
      );

      const fake_id = 'yolo';
      const result = await use_case.getUser(fake_id);

      expect(result).to.be.equals(mock_user);
      assert(
        json_place_holder_integration_mock.getUser.calledOnceWith(fake_id)
      );
    });
  });

  describe('list', () => {
    it('should return list todo by cache', async () => {
      const mock_list: Todo[] = [
        {
          name: 'yolo',
          status: TodoStatus.Active,
          user: 'yolo',
        },
        {
          name: 'yolo',
          status: TodoStatus.Active,
          user: 'yolo',
        },
      ];

      const todo_collection = {
        list: sinon.fake.resolves(mock_list),
        save: sinon.fake.resolves(undefined),
      };

      const todo_repository = {
        save: sinon.fake.resolves(undefined),
        list: sinon.fake.resolves(mock_list),
      };

      const json_place_holder_integration = {
        getUser: sinon.fake.resolves(''),
      };

      const todo_cache = {
        list: sinon.fake.resolves(mock_list),
        save: sinon.fake.resolves(undefined),
      };

      const use_case = new TodoService(
        todo_repository,
        todo_collection,
        json_place_holder_integration,
        todo_cache,
        // @ts-ignore
        null
      );

      const result = await use_case.list();

      expect(result).to.be.equal(mock_list);
      assert(todo_repository.list.notCalled);
      assert(todo_collection.list.calledOnce);
      assert(todo_cache.list.calledOnce);
    });

    it('should return list todo by db relational', async () => {
      const mock_list: Todo[] = [
        {
          name: 'yolo',
          status: TodoStatus.Active,
          user: 'yolo',
        },
        {
          name: 'yolo',
          status: TodoStatus.Active,
          user: 'yolo',
        },
      ];

      const todo_collection = {
        list: sinon.fake.resolves(mock_list),
        save: sinon.fake.resolves(undefined),
      };

      const todo_repository = {
        save: sinon.fake.resolves(undefined),
        list: sinon.fake.resolves(mock_list),
      };

      const json_place_holder_integration = {
        getUser: sinon.fake.resolves(''),
      };

      const todo_cache = {
        list: sinon.fake.resolves([]),
        save: sinon.fake.resolves(undefined),
      };

      const use_case = new TodoService(
        todo_repository,
        todo_collection,
        json_place_holder_integration,
        todo_cache,
        // @ts-ignore
        null
      );

      const result = await use_case.list();

      expect(result).to.be.equal(mock_list);
      assert(todo_collection.list.calledOnce);
      assert(todo_repository.list.calledOnce);
      assert(todo_cache.list.calledOnce);
    });
  });
});
