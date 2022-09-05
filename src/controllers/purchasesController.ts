import { Request, Response } from 'express';

import * as purchasesCardService from '../services/purchasesCardService/purchasesCard';

export async function cardPaymentController(req: Request, res: Response) {
  const { idCard, password, businessId, amount }: 
  { idCard: number, password: string, businessId: number, amount: number } = req.body;

  await purchasesCardService.purchasesCard(idCard, password, businessId, amount);

  res.sendStatus(200);
}