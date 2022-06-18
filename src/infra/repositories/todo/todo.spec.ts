import { assert, expect } from 'chai';
import Sinon from 'sinon';
import { TodoStatus } from '../../../core/entities';
import { TodoRepository } from '..';

describe('Repository - Todo', () => {
  describe('create', () => {
    it('should create todo with succeffully', () => {
      const fake_array = {
        push: Sinon.fake.returns(undefined),
      };

      // @ts-ignore
      const todo_repository = new TodoRepository(fake_array);

      const todo_fake = {
        name: 'yolo',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      todo_repository.create(todo_fake);

      assert(fake_array.push.calledOnceWith(todo_fake));
    });
  });
  describe('list', () => {
    it('should list todo with succeffully', () => {
      const todo_fake = [
        {
          name: 'yolo',
          status: TodoStatus.Active,
          user: 'yolo',
        },
      ];

      // @ts-ignore
      const todo_repository = new TodoRepository(todo_fake);

      const result = todo_repository.list();

      expect(result).to.be.eqls(todo_fake);
    });
  });
});
