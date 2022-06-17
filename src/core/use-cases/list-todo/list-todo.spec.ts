import { expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../entities';
import { ListTodoUseCase } from './list-todo';

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

      const todo_repository = {
        create: sinon.fake.returns(undefined),
        list: sinon.fake.returns(mock_list),
      };

      const use_case = new ListTodoUseCase({ todo_repository });

      const result = use_case.list();

      expect(result).to.be.equal(mock_list);
    });
  });
});
