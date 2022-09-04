import joi from 'joi';

export const apiKeySchema = joi.string().required().messages({
  'any.required': 'Api key is required',
  'string.empty': 'Invalid value',
});