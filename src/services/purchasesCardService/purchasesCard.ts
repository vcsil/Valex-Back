/* eslint-disable @typescript-eslint/no-throw-literal */
import * as getCardBalanceTransations from '../getCardBalanceTransactionsService/getCardBalanceTransactions';
import * as businessRepository from '../../repositories/businessRepository';
import * as paymentRepository from '../../repositories/paymentRepository';
import * as utilsFunctions from '../utils/utilsFunctions';

async function findBusinessById(businessId: number): Promise<any> {
  const business = await businessRepository.findById(businessId);

  if (!business) throw { code: 'Not Found', message: 'Business not found' };

  return business;
}

export async function purchasesCard(idCard: number, password: string, businessId: number, amount: number) {
  const { password: passwordCard, expirationDate, isBlocked, type: cardType } = await utilsFunctions.findCardById(idCard);

  if (!passwordCard) throw { code: 'Bad Request', message: 'Card is not active' };
  await utilsFunctions.validateDateCard(expirationDate);

  if (!isBlocked) throw { code: 'Bad Request', message: 'Card is blocked' };
  utilsFunctions.checkPassword(password, passwordCard || 'error');

  const business = await findBusinessById(businessId);
  if (business.type !== cardType) {
    throw {
      code: 'Bad Request',
      message: `Card type(${cardType}) is different from business type(${business.type})`,
    };
  }

  const { balance }: { balance: number } = await getCardBalanceTransations.getCardBalanceTransations(idCard);
  
  if (balance < amount) {
    throw { code: 'Bad Request', message: "Card doesn't have enough balance" };
  }

  const paymentData: { cardId: number; businessId: number; amount: number } = {
    cardId: idCard,
    businessId,
    amount,
  };

  await paymentRepository.insert(paymentData);

  return; 
}