import { assert } from 'chai';
import amqplib from 'amqplib';
import Sinon from 'sinon';
import { AmqpModule } from '..';
import { RabbitMQConfig } from './types';

describe('Module - Amqp', () => {
  describe('start', () => {
    it('should start module with succeffully', async () => {
      const container_fake = {
        create_todo_use_case: Sinon.fake.returns(undefined),
      };

      const config_fake: RabbitMQConfig = {
        host: 'fake',
        password: 'fake',
        port: 5959,
        protocol: 'fake',
        username: 'fake',
        vhost: '/',
      };

      // @ts-ignore
      const amqp = new AmqpModule(container_fake, config_fake);

      const chanel_fake = {
        on: Sinon.fake.returns(undefined),
        consume: Sinon.fake.returns(undefined),
        ack: Sinon.fake.returns(undefined),
        nack: Sinon.fake.returns(undefined),
      };

      const connection_fake = {
        on: Sinon.fake.returns(undefined),
        createChannel: Sinon.fake.resolves(chanel_fake),
      };

      // @ts-ignore
      Sinon.stub(amqplib, 'connect').resolves(connection_fake);

      await amqp.start();


      assert(connection_fake.on.calledOnce)
      assert(connection_fake.createChannel.calledOnce)
      assert(chanel_fake.on.calledTwice)
      assert(chanel_fake.consume.calledOnce)
      assert(chanel_fake.ack.notCalled)
      assert(chanel_fake.nack.notCalled)
    });
  });
});
