import { expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../entities';
import { ListTodoUseCase } from '..';

describe('UseCase - ListTodoUseCase', () => {
  describe('list', () => {
    it('should return list todo', async () => {
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

      const use_case = new ListTodoUseCase({
        todo_repository,
        json_place_holder_integration,
      });

      const result = await use_case.list();

      expect(result).to.be.equal(mock_list);
    });
  });
});
