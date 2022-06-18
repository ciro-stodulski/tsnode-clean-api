import { assert } from 'chai';
import Joi from 'joi';
import Sinon from 'sinon';
import { HttpModule } from '..';
import { Controller, RouteConfig, Middleware } from '../../../interface/http';

describe('Module - Http', () => {
  class TestGetController extends Controller {
    route_configs: RouteConfig = {
      method: 'get',
      path: '/test',
      status_code: 200,
    };

    async handle(): Promise<void> {}

    exception(error: Error): Error {
      return error;
    }
  }

  class TestPostController extends Controller {
    route_configs: RouteConfig = {
      method: 'post',
      path: '/test',
      status_code: 200,
      schema: Joi.allow(),
    };

    async handle(): Promise<void> {}

    exception(error: Error): Error {
      return error;
    }
  }
  class TestMiddleware implements Middleware {
    async handle() {}
  }
  class TestPutController extends Controller {
    route_configs: RouteConfig = {
      method: 'put',
      path: '/test',
      status_code: 200,
      middlewares: [new TestMiddleware()],
    };

    async handle(): Promise<void> {}

    exception(error: Error): Error {
      return error;
    }
  }

  class TestPatchController extends Controller {
    route_configs: RouteConfig = {
      method: 'patch',
      path: '/test',
      status_code: 200,
    };

    async handle(): Promise<void> {}

    exception(error: Error): Error {
      return error;
    }
  }

  class TestDeleteController extends Controller {
    route_configs: RouteConfig = {
      method: 'delete',
      path: '/test',
      status_code: 200,
    };

    async handle(): Promise<void> {}

    exception(error: Error): Error {
      return error;
    }
  }

  describe('start', () => {
    it('should start module with succeffully', () => {
      const http = new HttpModule([
        new TestGetController(),
        new TestPostController(),
        new TestPutController(),
        new TestPatchController(),
        new TestDeleteController(),
      ]);

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

      //@ts-ignore
      http.app = app;
      //@ts-ignore
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
