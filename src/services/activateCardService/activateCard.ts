/* eslint-disable @typescript-eslint/no-throw-literal */
import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';

import * as cardRepository from '../../repositories/cardRepository';
import * as utilsFunctions from '../utils/utilsFunctions';

const cryptr = new Cryptr(process.env.TOKEN_CRYPTR || '');

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
  const { expirationDate, securityCode: CVC } = await utilsFunctions.findCardById(idCard);

  await utilsFunctions.validateDateCard(expirationDate);
  await checkCVC(securityCode, CVC);
  
  const passwordHash: string = encryptPassword(password);

  const cardData = {
    password: passwordHash,
    isBlocked: false,
  };

  await cardRepository.update(idCard, cardData);

  return; 
}