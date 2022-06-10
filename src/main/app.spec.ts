import { assert } from 'chai';
import sinon from 'sinon';
import { App } from './app';

describe('App', () => {
  describe('start', () => {
    it('Should start cli module', () => {
      const cli_mock = {
        start: sinon.fake.returns(undefined),
      };
      // @ts-ignore
      const app = new App({ cli: cli_mock });

      app.start();

      assert(cli_mock.start.calledOnce);
    });
  });
});
