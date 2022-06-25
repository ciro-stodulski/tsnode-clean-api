import { assert, expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../entities';
import { JsonPlaceHolderUser } from '../../types';
import { CreateTodoUseCase } from '..';

describe('UseCase - CreateTodoUseCase', () => {
  describe('create', () => {
    it('Should create todo with succeffully', async () => {
      const result_db = 'yolo';
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

      const todo_create_service = {
        getUser: sinon.fake.resolves(mock_user),
        create: sinon.fake.resolves(result_db),
      };

      // @ts-ignore
      const use_case = new CreateTodoUseCase(todo_create_service);

      const dto = {
        name: 'GYN',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const result = await use_case.create(dto);
      expect(result).to.be.equals(result_db);

      assert(todo_create_service.create.calledOnceWith(new Todo(dto)));
      assert(todo_create_service.getUser.calledOnceWith(dto.user));
    });
  });
});
