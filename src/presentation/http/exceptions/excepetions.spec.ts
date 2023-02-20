import { expect } from 'chai';
import {
  BadRequest,
  HttpError,
  NotFoundError,
  Unauthorized,
} from 'src/presentation/http';

describe('Interface - Http - Exceptions', async () => {
  describe('Http error', () => {
    it('should create class', () => {
      const props = {
        code: 'YOLO',
        message: 'yolo',
        status_code: 503,
      };

      const error = new HttpError(props.code, props.message, props.status_code);

      expect(error.code).to.be.eqls(props.code);
      expect(error.message).to.be.eqls(props.message);
      expect(error.status_code).to.be.eqls(props.status_code);
    });
  });

  describe('Bad request', () => {
    it('should create class', () => {
      const props = {
        code: 'YOLO',
        message: 'yolo',
      };

      const error = new BadRequest(props.code, props.message);

      expect(error.code).to.be.eqls(props.code);
      expect(error.message).to.be.eqls(props.message);
      expect(error.status_code).to.be.eqls(400);
    });
  });

  describe('Not found', () => {
    it('should create class', () => {
      const props = {
        code: 'YOLO',
        message: 'yolo',
      };

      const error = new NotFoundError(props.code, props.message);

      expect(error.code).to.be.eqls(props.code);
      expect(error.message).to.be.eqls(props.message);
      expect(error.status_code).to.be.eqls(404);
    });
  });

  describe('Unauthorized', () => {
    it('should create class', () => {
      const props = {
        code: 'YOLO',
        message: 'yolo',
      };

      const error = new Unauthorized(props.code, props.message);

      expect(error.code).to.be.eqls(props.code);
      expect(error.message).to.be.eqls(props.message);
      expect(error.status_code).to.be.eqls(401);
    });
  });
});
