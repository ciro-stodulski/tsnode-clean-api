import { assert } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../../core/entities';
import { ListTodoCommand } from '..';

describe('Interface - CLI', () => {
  describe('list-todo', () => {
    it('list-todo', async () => {
      const fake_result: Todo[] = [
        {
          name: 'yolo',
          status: TodoStatus.Active,
          user: 'yolo',
        },
      ];

      const list_todo_use_case = {
        list: sinon.fake.resolves(fake_result),
      };

      // @ts-ignore
      const create_todo_command = new ListTodoCommand({ list_todo_use_case });

      await create_todo_command.run();

      assert(list_todo_use_case.list.calledOnce);
    });
  });
});
