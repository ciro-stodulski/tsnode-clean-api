import { expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../entities';
import { ListTodoUseCase } from '..';
import { JsonPlaceHolderUser } from '../../types';

describe('UseCase - ListTodoUseCase', () => {
  describe('list', () => {
    it('should return list todo', () => {
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

      const todo_repository = {
        create: sinon.fake.returns(undefined),
        list: sinon.fake.returns(mock_list),
      };

      const json_place_holder_integration = {
        getUser: sinon.fake.resolves(''),
      };

      const use_case = new ListTodoUseCase({
        todo_repository,
        json_place_holder_integration,
      });

      const result = use_case.list();

      expect(result).to.be.equal(mock_list);
    });
  });
});
