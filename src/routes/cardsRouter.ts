import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidationMiddleware';
import { activateCard, createCard } from '../controllers/cardsController';
import { apiKeySchema } from '../schemas/apiKeySchema';
import { createCardSchema } from '../schemas/createCardSchema';
import { cardActivationSchema } from '../schemas/cardActivationSchema';

const cardsRouter = Router();

cardsRouter.post(
  '/card', 
  validateSchema(apiKeySchema, 'headers', 'x-api-key'),
  validateSchema(createCardSchema, 'body'),
  createCard,
);

cardsRouter.patch(
  '/card',
  validateSchema(cardActivationSchema, 'body'),
  activateCard,
);

export default cardsRouter;