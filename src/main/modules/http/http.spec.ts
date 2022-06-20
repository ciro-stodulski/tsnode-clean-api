import { assert } from 'chai';
import Sinon from 'sinon';
import { HttpModule } from '..';

describe('Module - Http', () => {
  describe('start', () => {
    it('should start module with succeffully', () => {
      const container_fake = {
        list_todo_use_case: Sinon.fake.returns(undefined),
        create_todo_use_case: Sinon.fake.returns(undefined),
      };

      // @ts-ignore
      const http = new HttpModule(container_fake);

      const app = {
        set: Sinon.fake.returns(undefined),
        use: Sinon.fake.returns(undefined),
        listen: Sinon.fake.returns(undefined),
      };
      const router = {
        get: Sinon.fake.returns(undefined),
        post: Sinon.fake.returns(undefined),
        put: Sinon.fake.returns(undefined),
        patch: Sinon.fake.returns(undefined),
        delete: Sinon.fake.returns(undefined),
      };

      // @ts-ignore
      http.app = app;
      // @ts-ignore
      http.router = router;

      http.start();

      assert(app.set.calledOn);
      assert(app.use.calledOn);
      assert(app.listen.calledOnce);
      assert(router.get.calledOn);
      assert(router.post.calledOn);
      assert(router.put.calledOn);
      assert(router.patch.calledOn);
      assert(router.delete.calledOn);
    });
  });
});
