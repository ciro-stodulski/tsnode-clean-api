import { expect, assert } from 'chai';
import Sinon from 'sinon';
import { TodoStatus } from '../../../../domain/entities';
import { CreateTodoResolver } from '../..';

describe('Interface - Graphql', () => {
  describe('create-todo - resolver', () => {
    it('create todo with successfully', async () => {
      const fake_result_create = 'fake result';

      const create_todo_use_case = {
        create: Sinon.fake.resolves(fake_result_create),
      };

      const fake_dto = {
        name: 'test',
        status: TodoStatus.In_progress,
        user: '3',
      };

      // @ts-ignore
      const resolver = new CreateTodoResolver({ create_todo_use_case });

      const is_created = await resolver.createTodos(fake_dto);

      expect(is_created).to.be.eqls(true);
      assert(create_todo_use_case.create.calledOnceWith(fake_dto));
    });
  });
});
