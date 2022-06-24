import { assert, expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../entities';
import { JsonPlaceHolderUser } from '../../types';
import { CreateTodoUseCase } from '..';

describe('UseCase - CreateTodoUseCase', () => {
  describe('create', () => {
    it('Should create todo with succeffully', async () => {
      const result_db = 'yolo';
      const todo_repository_mock = {
        save: sinon.fake.resolves(result_db),
        list: sinon.fake.resolves(undefined),
      };

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

      const use_case_context = {
        todo_repository: todo_repository_mock,
        json_place_holder_integration: json_place_holder_integration_mock,
      };

      // @ts-ignore
      const use_case = new CreateTodoUseCase(use_case_context);

      const dto = {
        name: 'GYN',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const result = await use_case.create(dto);
      expect(result).to.be.equals(result_db);

      assert(todo_repository_mock.save.calledOnceWith(new Todo(dto)));
    });
  });
});
