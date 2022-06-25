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

      const list_todo_service = {
        list: sinon.fake.resolves(mock_list),
      };

      const use_case = new ListTodoUseCase(list_todo_service);

      const result = await use_case.list();

      expect(result).to.be.equal(mock_list);
      assert(list_todo_service.list.calledOnce);
    });
  });
});
