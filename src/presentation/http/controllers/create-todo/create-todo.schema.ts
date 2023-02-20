import Joi from 'joi';
import { TodoStatus } from 'src/domain/entities';

export const create_todo_schema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(TodoStatus))
      .required(),
    user: Joi.string().required(),
  }),
});
