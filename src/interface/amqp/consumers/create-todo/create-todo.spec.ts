import Sinon from 'sinon';
import { assert, expect } from 'chai';
import { TodoStatus } from '../../../../core/entities';
import { CreateTodoConsumer, TodoMessage } from '../..';

describe('Interface - Amqp', () => {
  describe('create-todo - consumer', () => {
    it('create todo with successfully', async () => {
      const message_fake: TodoMessage = {
        name: 'yolo',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const create_todo_use_case = {
        create: Sinon.fake.resolves(undefined),
      };

      const consumer = new CreateTodoConsumer(create_todo_use_case);

      await consumer.handle(message_fake);

      assert(create_todo_use_case.create.calledOnceWith(message_fake));
    });

    it('create todo with successfully', async () => {
      const create_todo_use_case = {
        create: Sinon.fake.resolves(undefined),
      };

      const consumer = new CreateTodoConsumer(create_todo_use_case);

      const error = new Error('error test');
      // @ts-ignore
      const result = await consumer.exception(error);

      expect(result).to.be.eqls({
        should_ack: true,
      });
    });
  });
});
