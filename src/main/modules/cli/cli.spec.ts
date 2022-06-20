import { assert } from 'chai';
import sinon from 'sinon';
import { CliModule } from './cli';

describe('Module - CLI', () => {
  describe('start', () => {
    it('Should start program command with succeffully', () => {
      const program = {
        on: sinon.fake.returns(undefined),
      };
      const cli = new CliModule(
        {
          // @ts-ignore
          program,
        },
        program
      );

      cli.start();

      assert(program.on.calledOnce);
    });
  });
});
