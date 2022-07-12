import { assert } from 'chai';
import sinon from 'sinon';
import { App } from './app';
import { env } from './env';

describe('App', () => {
  describe('start', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
      sandbox.restore();
    });

    it('Should start modules', async () => {
      sandbox.replace(env, 'http_port', 3000);
      sandbox.replace(env, 'redis_host', 'yolo');
      sandbox.replace(env, 'json_place_holder_url', 'yolo');
      sandbox.replace(env, 'rabbit_mq_enabled', true);
      sandbox.replace(env, 'rabbit_mq_host', 'yolo');
      sandbox.replace(env, 'rabbit_mq_password', 'yolo');
      sandbox.replace(env, 'rabbit_mq_port', 3000);
      sandbox.replace(env, 'rabbit_mq_protocol', 'amqp');
      sandbox.replace(env, 'rabbit_mq_username', 'yolo');
      sandbox.replace(env, 'rabbit_mq_vhost', 'yolo');

      const cli_mock = {
        start: sinon.fake.returns(undefined),
      };

      const http_mock = {
        start: sinon.fake.returns(undefined),
      };

      const amqp_mock = {
        start: sinon.fake.returns(undefined),
      };

      const app = new App(
        // @ts-ignore
        { cli: cli_mock, http: http_mock, amqp: amqp_mock },
        {}
      );

      await app.start();

      assert(cli_mock.start.calledOnce);
      assert(http_mock.start.calledOnce);
      assert(amqp_mock.start.calledOnce);
    });
  });
});
