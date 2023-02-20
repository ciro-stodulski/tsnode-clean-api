import { expect } from 'chai';
import Joi from 'joi';
import { validation } from 'src/presentation/amqp';
import { ValidationError } from 'src/shared/errors/validation-error';

describe('Interface - amqp - middleware', () => {
  describe('Validation', () => {
    it('Validation with successfully', () => {
      const test_schema = Joi.object({
        body: Joi.object({
          test: Joi.string().required(),
        }),
      });

      const message = {
        body: {
          test: 'yolo',
        },
      };

      const message_valid = validation(test_schema)(message);

      expect(message_valid).to.be.eqls(message_valid);
    });

    it('Validation with error schema validation', () => {
      const test_schema = Joi.object({
        body: Joi.object({
          test: Joi.string().required(),
        }),
      });

      const message = {
        body: {
          test: 1,
        },
      };

      let err = null;
      try {
        validation(test_schema)(message);
      } catch (error: any) {
        err = error;
      }

      expect(err).to.be.instanceOf(ValidationError);
      expect(err?.message).to.be.eqls('Invalid request data');
    });

    it('Validation with error body not found', () => {
      const test_schema = Joi.object({
        body: Joi.object({
          test: Joi.string().required(),
        }),
      });

      const message = {
        test: {
          test: 1,
        },
      };

      let err = null;
      try {
        validation(test_schema)(message);
      } catch (error: any) {
        err = error;
      }

      expect(err).to.be.instanceOf(ValidationError);
      expect(err?.message).to.be.eqls('body is required');
    });
  });
});
