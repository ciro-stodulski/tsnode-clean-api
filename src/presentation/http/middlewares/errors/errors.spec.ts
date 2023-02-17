import { expect } from 'chai';
import { ErrorHandlerMiddleware, BadRequest } from '../..';

describe('Interface - Http - Middleware', () => {
  describe('error', () => {
    it('should return error httpError', () => {
      const error_handler_middleware = new ErrorHandlerMiddleware();

      const req_fake = {};
      const error = new BadRequest('BAD_REQUEST', 'error test');

      const result = error_handler_middleware.handle(req_fake, error);

      expect(result).to.be.eqls({
        data: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
        status: error.status_code,
      });
    });

    it('should return error ER_DUP_ENTRY', () => {
      const error_handler_middleware = new ErrorHandlerMiddleware();
      const req_fake = {};
      const error = { code: 'ER_DUP_ENTRY' };

      const result = error_handler_middleware.handle(req_fake, error);

      expect(result).to.be.eqls({
        data: {
          code: 'DUPLICATED_RESOURCE',
          message: 'duplicated resource',
        },
        status: 409,
      });
    });

    it('should return error unexpected', () => {
      const error_handler_middleware = new ErrorHandlerMiddleware();
      const req_fake = {};
      const error = new Error('ERROR');

      const result = error_handler_middleware.handle(req_fake, error);
      expect(result).to.be.eqls({
        data: {
          code: 'UNEXPECTED_ERROR',
          message: 'error unexpected',
        },
        status: 500,
      });
    });
  });
});
