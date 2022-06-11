import { assert, expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from '../../entities';
import { CreateTodoUseCase } from '..';

describe('UseCase - CreateTodoUseCase', () => {
  describe('create', () => {
    it('Should create todo with succeffully', () => {
      const todo_repository_mock = {
        create: sinon.fake.returns(undefined),
        list: sinon.fake.returns(undefined),
      };

      const use_case_context = {
        todo_repository: todo_repository_mock,
      };

      // @ts-ignore
      const use_case = new CreateTodoUseCase(use_case_context);

      const dto = {
        name: 'GYN',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const result = use_case.create(dto);
      expect(result).to.be.equals('Todo created!');

      assert(todo_repository_mock.create.calledOnceWith(new Todo(dto)));
    });
  });
});
