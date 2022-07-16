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
      sandbox.replace(env, 'graphql_port', 4000);
      sandbox.replace(env, 'db_not_sql_auth_source', 'yolo');
      sandbox.replace(env, 'db_not_sql_database', 'yolo');
      sandbox.replace(env, 'db_not_sql_host', 'yolo');
      sandbox.replace(env, 'db_not_sql_password', 'yolo');
      sandbox.replace(env, 'db_not_sql_user', 'yolo');
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

      const graphql_mock = {
        start: sinon.fake.returns(undefined),
      };

      const mongodb_mock = {
        start: sinon.fake.returns(undefined),
      };

      const inti_modules_fake = {
        cli: cli_mock,
        http: http_mock,
        amqp: amqp_mock,
        graphql: graphql_mock,
        mongodb: mongodb_mock,
      };

      const app = new App(
        // @ts-ignore
        inti_modules_fake,
        {}
      );

      await app.start();

      assert(cli_mock.start.calledOnce);
      assert(http_mock.start.calledOnce);
      assert(amqp_mock.start.calledOnce);
      assert(graphql_mock.start.calledOnce);
      assert(mongodb_mock.start.calledOnce);
    });
  });
});
