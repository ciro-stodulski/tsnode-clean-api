import Joi from 'joi';
import { TodoStatus } from '../../../../core/entities';

export const create_todo_scheama = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(TodoStatus))
      .required(),
    user: Joi.string().required(),
  }),
});
