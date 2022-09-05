import { Request, Response } from 'express';

import * as getCardBalanceTransactionsService from '../services/getCardBalanceTransactionsService/getCardBalanceTransactions';
import * as createCardService from '../services/createCardService/createCard';
import * as activateCardService from '../services/activateCardService/activateCard';
import { TransactionTypes } from '../repositories/cardRepository';

export async function createCard(req: Request, res: Response) {
  const { 'x-api-key': apiKey }: any = req.headers;

  const { employeeId, type }: { employeeId: number; type: TransactionTypes } = req.body;
  
  await createCardService.createCard(apiKey, employeeId, type);

  return res.status(201).send('Created card.');
}

export async function activateCard(req: Request, res: Response) {
  const { idCard, securityCode, password }: { idCard: number, securityCode: string, password: string } = req.body;
  
  await activateCardService.activateCard(idCard, securityCode, password);

  res.send('oii');
}

export async function getCardBalanceTransactions(req: Request, res: Response) {
  const { idCard } = req.params;
  const balanceAndTransactions: any = await getCardBalanceTransactionsService.getCardBalanceTransations(parseInt(idCard));

  res.status(200).send(balanceAndTransactions);
}