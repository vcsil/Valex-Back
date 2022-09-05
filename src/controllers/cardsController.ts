import { Request, Response } from 'express';

import * as getCardBalanceTransactionsService from '../services/getCardBalanceTransactionsService/getCardBalanceTransactions';
import * as activateCardService from '../services/activateCardService/activateCard';
import * as unBlockCardService from '../services/unBlockCardService/unBlockCard';
import * as createCardService from '../services/createCardService/createCard';
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

  res.status(200).send('Activated card.');
}

export async function getCardBalanceTransactions(req: Request, res: Response) {
  const { idCard } = req.params;
  const balanceAndTransactions: any = await getCardBalanceTransactionsService.getCardBalanceTransations(parseInt(idCard));

  res.status(200).send(balanceAndTransactions);
}

export async function blockCardController(req: Request, res: Response) {
  const { idCard, password }: { idCard: number; password: string } = req.body;
  const { action } = req.params;

  await unBlockCardService.unBlockCard(idCard, password, action);

  res.sendStatus(200);
}