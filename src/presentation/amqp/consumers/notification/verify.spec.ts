import Sinon from 'sinon';
import { assert, expect } from 'chai';
import { VerifyConsumer } from 'src/presentation/amqp';
import { EventDto } from 'src/domain/dto';

describe('Interface - Amqp', () => {
  describe('verify - consumer', () => {
    it('verify notification with successfully', async () => {
      const message_fake: EventDto = {
        name: 'yolo',
        describe: 'yolo',
      };

      const verify_notification_use_case = {
        notify: Sinon.fake.resolves(undefined),
      };

      const consumer = new VerifyConsumer(verify_notification_use_case);

      await consumer.handle({ body: message_fake });

      assert(verify_notification_use_case.notify.calledOnceWith(message_fake));
    });

    it('validate error consumer', async () => {
      const verify_notification_use_case = {
        notify: Sinon.fake.resolves(undefined),
      };

      const consumer = new VerifyConsumer(verify_notification_use_case);

      const error = new Error('error test');
      // @ts-ignore
      const result = await consumer.exception(error);

      expect(result).to.be.eqls({
        should_ack: true,
      });
    });
  });
});
