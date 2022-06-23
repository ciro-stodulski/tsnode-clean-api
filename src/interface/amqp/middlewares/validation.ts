import Joi from 'joi';
import { ValidationError } from '../../../shared/errors/validation-error';

export const validation =
  (schema: Joi.Schema) =>
  <T>(message: any): T => {
    const amqp_validation = schema.validate(message, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (!message.body) {
      throw new ValidationError([], 'body is required');
    }

    if (amqp_validation.error) {
      throw new ValidationError(amqp_validation.error.details);
    }

    return amqp_validation.value as T;
  };
