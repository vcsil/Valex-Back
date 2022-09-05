import joi from 'joi';

export const rechargeCardSchema = joi.object({
  idCard: joi.number().required(),
  amount: joi.number().greater(0).required(),
});