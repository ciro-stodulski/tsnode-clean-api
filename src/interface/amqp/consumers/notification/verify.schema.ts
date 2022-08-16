import Joi from 'joi';
import { TodoStatus } from '../../../../core/entities';

export const verify_schema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(TodoStatus))
      .required(),
  }),
});