import { assert, expect } from 'chai';
import Sinon from 'sinon';
import { TodoStatus, Todo } from '../../../../core/entities';
import { ListTodoController } from '../..';

describe('Interface - Http', () => {
  describe('list-todo', () => {
    it('return list todo with successfully', async () => {
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

      const list_todo_use_case = {
        list: Sinon.fake.returns(mock_list),
      };

      const controller = new ListTodoController(list_todo_use_case);

      const response = await controller.handle();

      expect(response).to.be.eqls({
        data: mock_list,
      });
      assert(list_todo_use_case.list.calledOnce);
    });

    it('return error', () => {
      const error = new Error('error test');
      const list_todo_use_case = {
        list: Sinon.fake.rejects(error),
      };

      const controller = new ListTodoController(list_todo_use_case);

      const response = controller.exception(error);

      expect(response).to.be.eqls(error);
    });
  });
});
