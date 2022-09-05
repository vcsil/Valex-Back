/* eslint-disable @typescript-eslint/no-throw-literal */
import * as cardRepository from '../../repositories/cardRepository';
import * as utilsFunctions from '../utils/utilsFunctions';

function checkActionType(action: string) {
  if (action === 'block' || action === 'unblock') {
    return; 
  } else {
    throw { code: 'Bad Request', message: 'Only "block" and "unblock" are valid' };
  }
}

function cardIsBlocked(isBlocked: boolean, action: string) {
  if (isBlocked && action === 'block') throw { code: 'Bad Request', message: 'Card is blocked' };
  if (!isBlocked && action === 'unblock') throw { code: 'Bad Request', message: 'Card is unblocked' };
  return;
}

export async function unBlockCard(idCard: number, password: string, action: string) {
  checkActionType(action);

  const { expirationDate, isBlocked, password: passwordCard } = await utilsFunctions.findCardById(idCard);
  utilsFunctions.checkPassword(password, passwordCard || 'error');
  
  await utilsFunctions.validateDateCard(expirationDate);
  cardIsBlocked(isBlocked, action);

  const cardData = {
    isBlocked: action === 'block' ? true : false,
  };

  await cardRepository.update(idCard, cardData);

  return;
}