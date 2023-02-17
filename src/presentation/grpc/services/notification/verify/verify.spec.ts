import Sinon from 'sinon';
import { assert, expect } from 'chai';
import { VerifyGrpc } from '../../..';
import { Todo, TodoStatus } from '../../../../../domain/entities';

describe('Interface - Amqp', () => {
  describe('create-todo - consumer', () => {
    it('create todo with successfully', async () => {
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

      const create_todo_use_case = {
        list: Sinon.fake.resolves(mock_list),
      };

      const service = new VerifyGrpc(create_todo_use_case);

      const result = await service.handle();

      assert(create_todo_use_case.list.calledOnce);
      expect(result).to.be.eqls({
        data: {
          event: {
            name: 'Grpc integration with succeffully',
            describe: JSON.stringify(mock_list),
          },
        },
      });
    });
  });
});
