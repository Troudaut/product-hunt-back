import Joi from '@hapi/joi';

export const RETRIEVE_POSTS_JOI_SCHEMA = Joi.object().keys({
  day: Joi.string(),
});
