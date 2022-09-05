/* eslint-disable @typescript-eslint/no-throw-literal */
import * as cardRepository from '../../repositories/cardRepository';

export async function findCardById(id: number) {
  const card = await cardRepository.findById(id);
  console.log('oii');
  if (!card) throw { code: 'Not Found', message: 'Card not found' };
  
  if (card.password) throw { code: 'Bad Request', message: 'Card is already active' };
    
  return card; 
}