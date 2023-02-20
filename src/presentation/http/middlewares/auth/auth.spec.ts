import { expect } from 'chai';
import {
  AuthMiddleware,
  HttpRequest,
  Unauthorized,
} from 'src/presentation/http';

describe('Interface - Http - Middleware', async () => {
  describe('auth', () => {
    it('valid header with token', () => {
      const req: HttpRequest<undefined> = {
        body: undefined,
        headers: {
          authorization: 'Bearer test',
        },
      };

      const middleware = new AuthMiddleware();

      middleware.handle(req);
    });

    it('should return error unauthorize', async () => {
      const req: HttpRequest = {
        body: undefined,
        headers: {
          authorization: 'yolo',
        },
      };

      const middleware = new AuthMiddleware();

      let err = null;
      try {
        await middleware.handle(req);
      } catch (error) {
        err = error;
      }

      expect(err).to.be.not.eql(null);
      expect(err).to.be.instanceOf(Unauthorized);
    });
  });
});
