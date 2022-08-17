import sinon from 'sinon';
import { assert } from 'chai';
import { TodoProducer, AMQPPublishOptions } from '../../..';

describe('TodoProducer', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#sync', () => {
    it('should send message to queue', () => {
      const amqp = {
        publish: sandbox.fake.resolves(undefined),
      };

      // @ts-ignore
      const producer = new TodoProducer(amqp);

      const message = 'yolo';

      const options_config: AMQPPublishOptions = {
        priority: 0,
        delivery_mode: 2,
        content_encoding: 'UTF-8',
        content_type: 'application/json',
      };

      producer.notification(message);

      assert(
        amqp.publish.calledOnceWith({
          message: { name: message, describe: 'service client producer' },
          options: options_config,
          exchange: 'todo.dx',
          routing_key: 'notify.create',
        })
      );
    });
  });
});
