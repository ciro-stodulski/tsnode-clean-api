import { assert, expect } from 'chai';
import Sinon from 'sinon';
import { TodoStatus } from '../../../core/entities';
import { TodoRepository } from '..';

describe('Repository - Todo', () => {
  describe('create', () => {
    it('should create todo with succeffully', async () => {
      const result_db = 'yolo';
      const fake_insert = Sinon.fake.returns(result_db);
      const fake_columns = Sinon.fake.returns({
        insert: fake_insert,
      });
      const fake_db = Sinon.fake.returns({
        columns: fake_columns,
      });

      // @ts-ignore
      const todo_repository = new TodoRepository(fake_db);

      const todo_fake = {
        name: 'yolo',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      await todo_repository.save(todo_fake);

      assert(fake_insert.calledOnceWith(todo_fake));
      assert(fake_db.calledOnceWith(todo_repository.config_table.name));
      assert(fake_columns.calledOnceWith(['name', 'status', 'user']));
    });
  });
  describe('list', () => {
    it('should list todo with succeffully', async () => {
      const todo_fake = [
        {
          name: 'yolo',
          status: TodoStatus.Active,
          user: 'yolo',
        },
      ];
      const fake_columns = Sinon.fake.returns(todo_fake);
      const fake_db = Sinon.fake.returns({
        columns: fake_columns,
      });

      // @ts-ignore
      const todo_repository = new TodoRepository(fake_db);

      const result = await todo_repository.list();

      expect(result).to.be.eqls(todo_fake);
      assert(fake_db.calledOnceWith(todo_repository.config_table.name));
      assert(fake_columns.calledOnceWith(['name', 'status', 'user']));
    });
  });
});
