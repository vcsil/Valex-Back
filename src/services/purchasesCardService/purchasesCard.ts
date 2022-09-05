/* eslint-disable @typescript-eslint/no-throw-literal */
import * as paymentRepository from '../../repositories/paymentRepository';
import * as utilsFunctions from '../utils/utilsFunctions';

export async function purchasesCard(idCard: number, password: string, businessId: number, amount: number) {
  const { password: passwordCard, expirationDate, isBlocked } = await utilsFunctions.findCardById(idCard);

  if (!passwordCard) throw { code: 'Bad Request', message: 'Card is not active' };
  await utilsFunctions.validateDateCard(expirationDate);

  if (!isBlocked) throw { code: 'Bad Request', message: 'Card is blocked' };
  utilsFunctions.checkPassword(password, passwordCard || 'error');


  
  const paymentData: { cardId: number; businessId: number; amount: number } = {
    cardId: idCard,
    businessId,
    amount,
  };

  await paymentRepository.insert(paymentData);

  return; 
}