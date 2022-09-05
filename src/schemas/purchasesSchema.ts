import joi from 'joi';

export const purchasesSchema = joi.object({
  idCard: joi.number().required(),
  password: joi.string().pattern(/^[0-9]{4}$/, { name: 'password' })
    .length(4).required(),
  businessId: joi.number().required(),
  amount: joi.number().greater(0).required(),
});