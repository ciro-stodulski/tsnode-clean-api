import { assert } from 'chai';
import Sinon from 'sinon';
import { EventDto } from '../../../application/use-cases';
import { NotificationService } from '..';

describe('Service - NotificationService', () => {
  describe('CheckNotify', () => {
    it('Should create todo with succeffully', async () => {
      const notification_proto = {
        verify: Sinon.fake.resolves('result_db'),
      };

      const service = new NotificationService(
        notification_proto,
        // @ts-ignore
        null
      );

      const msg = 'test';

      await service.checkNotify(msg);

      assert(notification_proto.verify.calledOnceWith(msg));
    });
  });
});

describe('Service - NotificationService', () => {
  describe('SendNotify', () => {
    it('Should send event with succeffully', async () => {
      const dto: EventDto = {
        describe: 'yolo',
        name: 'yolo',
      };

      const notification_producer = {
        SendNotify: Sinon.fake.resolves('result_db'),
      };

      const service = new NotificationService(
        // @ts-ignore
        null,
        notification_producer
      );

      const msg = 'test';

      await service.sendNotify(dto);

      assert(notification_producer.SendNotify.calledOnceWith(dto));
    });
  });
});
