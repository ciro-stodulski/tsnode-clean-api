import sinon from 'sinon';
import { assert, expect } from 'chai';
import { NotificationPB } from 'src/infra/integrations';
import { EventDto } from 'src/domain/dto';

describe('NotificationPB', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#Verify', () => {
    it('should verify msg with succeffully', async () => {
      const fake_response = {
        event: {
          Name: 'test',
          Describe: 'tes',
        },
      };

      const proto_method = {
        verify: sandbox.fake.resolves(fake_response),
      };

      const grpc_client_fake = {
        createInstance: sandbox.fake.returns(proto_method),
      };

      // @ts-ignore
      const pb = new NotificationPB(grpc_client_fake);

      const dto: EventDto = {
        describe: fake_response.event.Describe,
        name: fake_response.event.Name,
      };

      const msg = 'yolo';
      const response = await pb.verify(msg);

      expect(response).to.be.eqls(dto);
      assert(proto_method.verify.calledOnceWith(msg));
    });
  });
});
