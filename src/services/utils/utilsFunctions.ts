/* eslint-disable @typescript-eslint/no-throw-literal */
import customParseFormat from 'dayjs/plugin/customParseFormat';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

import * as cardRepository from '../../repositories/cardRepository';

dayjs.extend(customParseFormat);

export async function findCardById(id: number) {
  const card = await cardRepository.findById(id);
  console.log('oii');
  if (!card) throw { code: 'Not Found', message: 'Card not found' };
  
  if (card.password) throw { code: 'Bad Request', message: 'Card is already active' };
    
  return card; 
}

export async function validateDateCard(expirationDate: string) {
  const todayDateArr: string[] = dayjs().format('MM/YY').split('/');
  const expirationDateArr: string[] = expirationDate.split('/');

  const todayDateTime = new Date(parseInt('20' + todayDateArr[1]), parseInt(todayDateArr[0]), 1);
  const expirationDateTime = new Date(parseInt('20' + expirationDateArr[1]), parseInt(expirationDateArr[0]), 1);

  if (todayDateTime >= expirationDateTime) throw { code: 'Bad Request', message: 'Card is already active' };

  return;
}

export async function checkPassword(password: string, cardPassword: string) {
  if (!bcrypt.compareSync(password, cardPassword))
    throw { code: 'Unauthorized', message: 'Incorrect password' };
  return;
}