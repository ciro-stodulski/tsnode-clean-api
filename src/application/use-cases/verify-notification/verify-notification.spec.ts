import { assert } from 'chai';
import sinon from 'sinon';
import { VerifyNotificationUseCase } from 'src/application/use-cases';
import { EventDto } from 'src/domain/dto';

describe('UseCase - VerifyNotificationUseCase', () => {
  describe('Notify', () => {
    it('should send notify with succeffully', async () => {
      const notification_service = {
        checkNotify: sinon.fake.resolves(undefined),
      };

      // @ts-ignore
      const use_case = new VerifyNotificationUseCase(notification_service);

      const dto: EventDto = {
        describe: 'yolo',
        name: 'yolinho',
      };

      await use_case.notify(dto);

      assert(notification_service.checkNotify.calledOnceWith(dto.name));
    });
  });
});
