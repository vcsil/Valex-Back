import { Request, Response } from 'express';

import * as rechargeCardService from '../services/rechargesCardService/rechargeCard';

export async function rechargeCard(req: Request, res: Response) {
  const { idCard, amount }: { idCard: number, amount: number } = req.body;
  const { 'x-api-key': apiKey }: any = req.headers;

  await rechargeCardService.rechargeCard(idCard, amount, apiKey);

  res.send({ idCard, amount, apiKey });
}