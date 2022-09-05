/* eslint-disable @typescript-eslint/no-throw-literal */
import customParseFormat from 'dayjs/plugin/customParseFormat';
import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';
import dayjs from 'dayjs';

import * as cardRepository from '../../repositories/cardRepository';
import * as searchFunctions from '../utils/searchFunctions';

dayjs.extend(customParseFormat);
const cryptr = new Cryptr(process.env.TOKEN_CRYPTR || '');

async function validateDateCard(expirationDate: string) {
  const todayDateArr: string[] = dayjs().format('MM/YY').split('/');
  const expirationDateArr: string[] = expirationDate.split('/');

  const todayDateTime = new Date(parseInt('20' + todayDateArr[1]), parseInt(todayDateArr[0]), 1);
  const expirationDateTime = new Date(parseInt('20' + expirationDateArr[1]), parseInt(expirationDateArr[0]), 1);

  if (todayDateTime >= expirationDateTime) throw { code: 'Bad Request', message: 'Card is already active' };

  return;
}

async function checkCVC(securityCode:string, cardCVC: string) {
  const cvvCardDecrypted: string = cryptr.decrypt(cardCVC);

  const correctCVC: boolean = securityCode === cvvCardDecrypted;

  if (!correctCVC) throw { code: 'Bad Request', message: 'Security code is incorrect' };

  return; 
}

function encryptPassword(password: string): string {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}

export async function activateCard(idCard: number, securityCode: string, password: string) {
  const { expirationDate, securityCode: CVC } = await searchFunctions.findCardById(idCard);

  await validateDateCard(expirationDate);
  await checkCVC(securityCode, CVC);
  
  const passwordHash: string = encryptPassword(password);

  const cardData = {
    password: passwordHash,
    isBlocked: false,
  };

  await cardRepository.update(idCard, cardData);

  return; 
}