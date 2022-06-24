import { assert, expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../entities';
import { ListTodoUseCase } from '..';

describe('UseCase - ListTodoUseCase', () => {
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

      const use_case = new ListTodoUseCase({
        todo_cache,
        todo_repository,
        json_place_holder_integration,
      });

      const result = await use_case.list();

      expect(result).to.be.equal(mock_list);
      assert(todo_repository.list.notCalled);
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

      const use_case = new ListTodoUseCase({
        todo_cache,
        todo_repository,
        json_place_holder_integration,
      });

      const result = await use_case.list();

      expect(result).to.be.equal(mock_list);
      assert(todo_repository.list.calledOnce);
      assert(todo_cache.list.calledOnce);
    });
  });
});
