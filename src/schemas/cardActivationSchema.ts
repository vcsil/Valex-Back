import joi from 'joi';

export const cardActivationSchema = joi.object({
  idCard: joi.number().required(),
  securityCode: joi.string().length(3).required(),
  password: joi.string().pattern(/^[0-9]{4}$/, { name: 'password' })
    .length(4).required(),
});
