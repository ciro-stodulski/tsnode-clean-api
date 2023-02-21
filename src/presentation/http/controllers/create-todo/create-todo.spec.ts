import { expect, assert } from 'chai';
import Sinon from 'sinon';
import { TodoStatus, Todo } from 'src/domain/entities';
import {
  CreateTodoController,
  HttpRequest,
  create_todo_schema,
} from 'src/presentation/http';

describe('Interface - Http', () => {
  describe('create-todo - controller', () => {
    it('create todo with successfully', async () => {
      const body_fake: Todo = {
        name: 'yolo',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const fake_result_create = 'fake result';

      const create_todo_use_case = {
        create: Sinon.fake.resolves(fake_result_create),
      };

      const fake_req: HttpRequest = {
        body: body_fake,
      };

      const controller = new CreateTodoController(create_todo_use_case);

      const response = await controller.handle(fake_req);

      expect(response).to.be.eqls(undefined);
      assert(create_todo_use_case.create.calledOnceWith(body_fake));
    });

    it('return error', () => {
      const error = new Error('error test');
      const create_todo_use_case = {
        create: Sinon.fake.rejects(error),
      };

      const controller = new CreateTodoController(create_todo_use_case);

      const response = controller.exception(error);

      expect(response).to.be.eqls(error);
    });
  });

  describe('create-todo - schema', () => {
    it('create todo with successfully', async () => {
      const body_fake = {
        name: 'yolo',
        status: TodoStatus.Active,
        user: 'yolo',
      };
      const fake_req: HttpRequest = {
        body: body_fake,
      };

      const validation = create_todo_schema.validate(fake_req, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
      });

      expect(validation.error).to.be.eql(undefined);
    });
  });
});
