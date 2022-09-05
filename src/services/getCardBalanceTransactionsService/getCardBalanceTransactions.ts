/* eslint-disable @typescript-eslint/return-await */
import * as rechargeRepository from '../../repositories/rechargeRepository';
import * as paymentRepository from '../../repositories/paymentRepository';
import * as utilsFunctions from '../utils/utilsFunctions';

function getArrSum(transactions: any): number {
  return transactions.reduce(
    (sum: number, transaction: any) => sum + transaction.amount,
    0,
  );
}

function getCardBalance(recharges: any, payments: any): number {
  const rechargesSum: number = getArrSum(recharges);
  const paymentsSum: number = getArrSum(payments);
  
  return rechargesSum - paymentsSum;
}

export async function getCardBalanceTransations(id: number): Promise<any> {
  await utilsFunctions.findCardById(id);

  const recharges: any = await rechargeRepository.findByCardId(id);
  const transactions: any = await paymentRepository.findByCardId(id);

  const balance: number = getCardBalance(recharges, transactions);

  const cardAbstract: {
    balance: number;
    transactions: any;
    recharges: any;
  } = {
    balance,
    transactions,
    recharges,
  };

  return cardAbstract;
}