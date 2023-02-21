import { assert, expect } from 'chai';
import sinon from 'sinon';
import { Todo, TodoStatus } from 'src/domain/entities';
import { JsonPlaceHolderUserDto } from 'src/domain/dto';
import { CreateTodoUseCase } from 'src/application/use-cases';

describe('UseCase - CreateTodoUseCase', () => {
  describe('create', () => {
    it('Should create todo with succeffully', async () => {
      const result_db = 'yolo';
      const mock_user: JsonPlaceHolderUserDto = {
        company: {
          bs: 'yolo',
          catchPhrase: 'yolo',
          name: 'yolo',
        },
        email: 'yolo@yolo.com',
        id: 1,
        name: 'yolo',
        phone: 'yolo',
        username: 'yolo',
        website: 'yolo',
        address: {
          city: 'yolo',
          geo: {
            lat: 'yolo',
            lng: 'yolo',
          },
          street: 'yolo',
          suite: 'yolo',
          zipcode: 'yolo',
        },
      };

      const todo_create_service = {
        getUser: sinon.fake.resolves(mock_user),
        create: sinon.fake.resolves(result_db),
      };

      const notification_service = {
        sendNotify: sinon.fake.resolves(undefined),
      };

      const use_case = new CreateTodoUseCase(
        // @ts-ignore
        todo_create_service,
        notification_service
      );

      const dto = {
        name: 'GYN',
        status: TodoStatus.Active,
        user: 'yolo',
      };

      const result = await use_case.create(dto);
      expect(result).to.be.equals(result_db);

      assert(todo_create_service.create.calledOnceWith(new Todo(dto)));
      assert(todo_create_service.getUser.calledOnceWith(dto.user));
      assert(
        notification_service.sendNotify.calledOnceWith({
          describe: dto.status,
          name: dto.name,
        })
      );
    });
  });
});
