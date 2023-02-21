import { assert, expect } from 'chai';
import Sinon from 'sinon';
import { TodoCollection } from 'src/infra/repositories';
import { Todo, TodoStatus } from 'src/domain/entities';

describe('Collection - todo', () => {
  describe('save', async () => {
    const model_fake = {
      create: Sinon.fake.resolves(undefined),
    };

    const todo_collection = new TodoCollection();

    const todo: Todo = {
      name: 'yolo',
      status: TodoStatus.Active,
      user: 'yolo',
    };

    await todo_collection.save(todo);

    assert(model_fake.create.calledOnceWith(todo));
  });

  describe('list', async () => {
    const todos: Todo[] = [
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

    const model_fake = {
      list: Sinon.fake.resolves(todos),
    };

    const todo_collection = new TodoCollection();

    const result = await todo_collection.list();

    expect(result).to.be.eqls(result);
    assert(model_fake.list.calledOnce);
  });
});
