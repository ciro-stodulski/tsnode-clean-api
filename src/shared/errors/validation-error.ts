import Joi from 'joi';
import { CodedError } from 'src/shared';

export class ValidationError extends CodedError {
  constructor(details: Joi.ValidationErrorItem[], msg?: string) {
    super(
      'VALIDATION_FAILED',
      msg || 'Invalid request data',
      details as Joi.ValidationErrorItem[]
    );
  }
}
