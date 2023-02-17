import Joi from 'joi';

export const create_todo_schema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    describe: Joi.string().required(),
  }),
});
