import { Router } from 'express';

import { cardPaymentController } from '../controllers/purchasesController';
import validateSchema from '../middlewares/schemaValidationMiddleware';
import { purchasesSchema } from '../schemas/purchasesSchema';

const rechargeRouter = Router();

rechargeRouter.post(
  '/payments',
  validateSchema(purchasesSchema, 'body'),
  cardPaymentController,
);

export default rechargeRouter;