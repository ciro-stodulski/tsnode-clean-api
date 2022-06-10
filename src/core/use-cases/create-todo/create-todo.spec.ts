import { expect } from 'chai';
import { TodoStatus } from '../../entities';
import { CreateTodoUseCase } from './create-todo';

describe('UseCase - CreateTodoUseCase', () => {
  describe('create', () => {
    it('Should create todo with succeffully', () => {
      const use_case = new CreateTodoUseCase();
      const dto = {
        name: 'GYN',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const result = use_case.create(dto);
      expect(result).to.be.equals('Todo created!');
    });
  });
});
