import { Router } from 'express';

import validateSchema from '../middlewares/schemaValidationMiddleware';
import { createCard } from '../controllers/cardsController';
import { apiKeySchema } from '../schemas/apiKeyschema';
import { createCardSchema } from '../schemas/createCardSchema';

const cardsRouter = Router();

cardsRouter.get(
  '/createCard', 
  validateSchema(apiKeySchema, 'headers', 'x-api-key'),
  validateSchema(createCardSchema, 'body'),
  createCard,
);

export default cardsRouter;