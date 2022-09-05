import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidationMiddleware';
import { rechargeCardSchema } from '../schemas/rechargeCardSchema';
import { apiKeySchema } from '../schemas/apiKeySchema';
import { rechargeCard } from '../controllers/rechargeController';

const rechargeRouter = Router();

rechargeRouter.post(
  '/recharges',
  validateSchema(apiKeySchema, 'headers', 'x-api-key'),
  validateSchema(rechargeCardSchema, 'body'),
  rechargeCard,
);

export default rechargeRouter;