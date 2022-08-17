import Joi from 'joi';

export const verify_schema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    describe: Joi.string().required(),
  }),
});
