import { Router } from 'express';

import cardsRouter from './cardsRouter';
import rechargeRouter from './rechargeRouter';

const router = Router();

router.use(cardsRouter);
router.use(rechargeRouter);

export default router;