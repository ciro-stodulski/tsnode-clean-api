import { assert, expect } from 'chai';
import sinon from 'sinon';
import { TodoCache } from '../..';
import { Todo, TodoStatus } from '../../../../domain/entities';

describe('Repositories - Cache - Todo', () => {
  describe('save', () => {
    it('Should save with successfully', async () => {
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
      const cache_fake = {
        setWithExpirationTime: sinon.fake.resolves(undefined),
      };

      // @ts-ignore
      const todo_cache = new TodoCache(cache_fake);

      await todo_cache.save(mock_list);

      assert(
        cache_fake.setWithExpirationTime.calledOnceWith(
          'todos',
          JSON.stringify(mock_list),
          6000
        )
      );
    });
  });

  describe('list', () => {
    it('Should list with successfully', async () => {
      const mock_list = `[
        {
          "name": "yolo",
          "status": "ACTIVE",
          "user": "yolo"
        },
        {
          "name": "yolo",
          "status": "ACTIVE",
          "user": "yolo"
        }
      ]`;
      const cache_fake = {
        get: sinon.fake.resolves(mock_list),
      };

      // @ts-ignore
      const todo_cache = new TodoCache(cache_fake);
      const result = await todo_cache.list();

      expect(result).to.be.eqls(JSON.parse(mock_list));
      assert(cache_fake.get.calledOnceWith('todos'));
    });
    it('Should return null', async () => {
      const cache_fake = {
        get: sinon.fake.resolves(undefined),
      };

      // @ts-ignore
      const todo_cache = new TodoCache(cache_fake);
      const result = await todo_cache.list();

      expect(result).to.be.eqls([]);
      assert(cache_fake.get.calledOnceWith('todos'));
    });
  });
});
