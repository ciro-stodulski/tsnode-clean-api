import { expect, assert } from 'chai';
import Sinon from 'sinon';
import { TodoStatus } from 'src/domain/entities';
import { ListTodoResolver, TodoResponse } from 'src/presentation/graphql';

describe('Interface - Graphql', () => {
  describe('list-todo - resolver', () => {
    it('create todo with successfully', async () => {
      const fake_response: TodoResponse[] = [
        {
          name: 'test',
          status: TodoStatus.In_progress,
          user: '3',
        },
      ];

      const list_todo_use_case = {
        list: Sinon.fake.resolves(fake_response),
      };

      // @ts-ignore
      const resolver = new ListTodoResolver({ list_todo_use_case });

      const response = await resolver.getTodos();

      expect(response).to.be.eqls(fake_response);
      assert(list_todo_use_case.list.calledOnce);
    });
  });
});
