/* eslint-disable @typescript-eslint/no-throw-literal */
import * as rechargeRepository from '../../repositories/rechargeRepository';
import * as utilsFunctions from '../utils/utilsFunctions';

export async function rechargeCard(idCard: number, amount: number, apiKey: any) {
  await utilsFunctions.findCompanyByApiKey(apiKey);

  const { password, expirationDate } = await utilsFunctions.findCardById(idCard);

  if (!password) throw { code: 'Bad Request', message: 'Card is not active' };
  await utilsFunctions.validateDateCard(expirationDate);

  const rechargeData: { cardId: number; amount: number } = {
    cardId: idCard,
    amount,
  };

  await rechargeRepository.insert(rechargeData);

  return; 
}