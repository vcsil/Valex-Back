import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidationMiddleware';
import { activateCard, blockCardController, createCard, getCardBalanceTransactions } from '../controllers/cardsController';
import { apiKeySchema } from '../schemas/apiKeySchema';
import { createCardSchema } from '../schemas/createCardSchema';
import { cardActivationSchema } from '../schemas/cardActivationSchema';
import { blockCardSchema } from '../schemas/blockCardSchema';

const cardsRouter = Router();

cardsRouter.post(
  '/cards', 
  validateSchema(apiKeySchema, 'headers', 'x-api-key'),
  validateSchema(createCardSchema, 'body'),
  createCard,
);

cardsRouter.patch(
  '/cards',
  validateSchema(cardActivationSchema, 'body'),
  activateCard,
);

cardsRouter.get(
  '/cards/:idCard',
  getCardBalanceTransactions,
);

cardsRouter.patch( // action: 'block' | 'unblock'
  '/card/:action',
  validateSchema(blockCardSchema, 'body'),
  blockCardController,
);

export default cardsRouter;