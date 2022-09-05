import joi from 'joi';

export const blockCardSchema = joi.object({
  idCard: joi.number().required(),
  password: joi.string().pattern(/^[0-9]{4}$/, { name: 'password' })
    .length(4).required(),
});
