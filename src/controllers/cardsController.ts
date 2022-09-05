import { Request, Response } from 'express';

import * as cardService from '../services/cardService/cardService';
import { TransactionTypes } from '../repositories/cardRepository';

export async function createCard(req: Request, res: Response) {
  const { 'x-api-key': apiKey }: any = req.headers;

  const { employeeId, type }: { employeeId: number; type: TransactionTypes } = req.body;
  
  await cardService.createCard(apiKey, employeeId, type);

  return res.send('oiii');
}