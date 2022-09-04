import { Request, Response } from 'express';
import { TransactionTypes } from 'repositories/cardRepository';

export async function createCard(req: Request, res: Response) {
  const { 'x-api-key': apiKey }: any = req.headers;

  const { employeeId, type }: { employeeId: number; type: TransactionTypes } = req.body;

  res.send({
    apiKey,
    typeof: typeof(apiKey),
    employeeId,
    typeofEMP: typeof(employeeId),
    type,
    typeoft: typeof(type),
  });
}