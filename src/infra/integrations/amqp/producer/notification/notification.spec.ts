import sinon from 'sinon';
import { assert } from 'chai';
import {
  NotificationProducer,
  AMQPPublishOptions,
} from 'src/infra/integrations';
import { EventDto } from 'src/domain/dto';

describe('TodoProducer', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#SendNotify', () => {
    it('should send message to queue', async () => {
      const amqp = {
        publish: sandbox.fake.resolves(undefined),
      };

      const producer = new NotificationProducer(amqp);

      const dto: EventDto = {
        describe: 'yolo',
        name: 'yolo',
      };

      const options_config: AMQPPublishOptions = {
        priority: 0,
        delivery_mode: 2,
        content_encoding: 'UTF-8',
        content_type: 'application/json',
      };

      await producer.SendNotify(dto);

      assert(
        amqp.publish.calledOnceWith({
          message: dto,
          options: options_config,
          exchange: 'notification.dx',
          routing_key: 'notify.create',
        })
      );
    });
  });
});
